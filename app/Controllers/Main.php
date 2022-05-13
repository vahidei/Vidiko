<?php namespace App\Controllers;

use App\Libraries\SubtitlesManager;
use App\Models\Main_model;

class Main extends BaseController
{
    public function index()
    {
        echo view('main');
        die();
    }

    public function check_video_url()
    {
        if(!isset($_POST['url'])){
            show_404();
        }

        $throttler = \Config\Services::throttler();
        $allowed = $throttler->check('check_video_url', 2, MINUTE);

        if(!$allowed){
            output_api(['msg'=>lang('main.try_after_seconds').' '.$throttler->getTokenTime().' '.lang('main.seconds')], 400, 999);
        }

        $headers = get_headers($_POST['url'],1);

        if(strpos($headers['Content-Type'], 'video') !== false){
            $_SESSION['video'] = ['url'=>$_POST['url'], 'created_at'=>time(), 'ip'=>getIp()];
            output_api();
        }else{
            output_api([$headers['Content-Type']], 404, 1000);
        }

    }

    public function send_url()
    {

        if (!isset($_POST['url']) || !isset($_SESSION['video'])) {
            show_404();
        }

        $url = $_POST['url'];
        $ex = explode('.', $url);
        $mime = strtolower($ex[count($ex) - 1]);

        if (!in_array($mime, ['zip', 'srt'])) {
            output_api(['msg' => lang('main.wrong_file_type') . '<br/>' . lang('main.url_must_zip_srt')], 406, 1001);
        }

        $fl = md5(microtime() . rand(10000, 99999));
        $newfile = $fl . '.' . $mime;
        $addr = FCPATH . 'subtitles/from_url/';

        $maxSize = 2000000;
        $headers = get_headers($url);
        if ($headers["Content-Length"] > $maxSize) {
            output_api(['msg' => lang('main.maximum_upload_error_msg')], 406, 1002);
        }


        $throttler = \Config\Services::throttler();
        $allowed = $throttler->check('send_url', 2, MINUTE);

        if(!$allowed){
            output_api(['msg'=>lang('main.try_after_seconds').' '.$throttler->getTokenTime().' '.lang('main.seconds')], 400, 999);
        }

        if (!file_put_contents($addr . $newfile, fopen($url, 'r'))) {
            output_api(['msg' => lang('main.file_not_exists')], 422, 1003);
        }

        $vttFile = $this->create_vtt($addr, $fl, $newfile, $mime);


        $res = $this->create_video(['url'=>$vttFile['vtt'], 'original_title'=>$this->get_original_title($url)]);

        if(!$res){
            output_api(['msg' => lang('main.cannot_create_video')], 422, 1004);
        }

        output_api(['vtt' => $vttFile['vtt']]);
    }

    public function upload_file()
    {

        if (!isset($_FILES['file']) || empty($_FILES['file']['name']) || !isset($_SESSION['video'])) {
            show_404();
        }

        $file = $_FILES['file'];

        $addr = FCPATH . 'subtitles/uploaded/';
        $target_file = $addr . basename($file["name"]);

        $mime = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        if (!in_array($mime, ['zip', 'srt'])) {
            output_api(['msg' => lang('main.wrong_file_type')], 406, 1005);
        }

        $maxSize = 2000000;
        if ($file["size"] > $maxSize) {
            output_api(['msg' => lang('main.maximum_upload_error_msg')], 406, 1006);
        }

        $fl = md5(rand(1000, 9999) . basename($file["name"] . microtime()));

        $newfile = $fl . '.' . $mime;

        $target_file = $addr . $newfile;

        $throttler = \Config\Services::throttler();
        $allowed = $throttler->check('upload_file', 2, MINUTE);

        if(!$allowed){
            output_api(['msg'=>lang('main.try_after_seconds').' '.$throttler->getTokenTime().' '.lang('main.seconds')], 400, 999);
        }

        if (move_uploaded_file($file["tmp_name"], $target_file)) {
            $vttFile = $this->create_vtt($addr, $fl, $newfile, $mime);
        } else {
            output_api(['msg' => lang('main.file_not_exists')], 422, 1007);
        }

        $res = $this->create_video(['url'=>$vttFile['vtt'], 'original_title'=>$this->get_original_title($file['name'])]);

        if(!$res){
            output_api(['msg' => lang('main.cannot_create_video')], 422, 1008);
        }

        output_api(['msg' => lang('main.upload_was_successful'), 'vtt' => $vttFile['vtt']]);
    }

    public function create_link(){
        if($this->request->getMethod() !== 'post'){
            show_404();
        }

       /* if(!isset($_SESSION['user'])){
            output_api(['msg'=>lang('main.need_login')], 400, 1012);
        } */

        if(!isset($_SESSION['video']['vtt']['url'])){
            output_api(['msg'=>lang('main.wrong_way')], 400, 1013);
        }

        if(isset($_SESSION['video']['code'])){
            output_api(['code'=>$_SESSION['video']['code']]);
        }

        $model = new Main_model();

        $code = $model->create_link($_SESSION['video']);

        if(!$code){
            output_api(['msg'=>lang('main.cannot_create_link')], 500, 1014);
        }

        $_SESSION['video']['code'] = $code;
        output_api(['code'=>$code]);

    }

    // ------------------- PRIVATE FUNCTIONS ------------------------------

    private function rglob($pattern, $flags = 0)
    {
        $files = glob($pattern, $flags);
        if (!empty($files)) {
            return $files;
        }
        foreach (glob(dirname($pattern) . '/*', GLOB_ONLYDIR | GLOB_NOSORT) as $dir) {
            $files = array_merge($files, $this->rglob($dir . '/' . basename($pattern), $flags));
        }
        return $files;
    }

    private function deleteDirectory($dir)
    {
        if (!file_exists($dir)) {
            return true;
        }

        if (!is_dir($dir)) {
            return unlink($dir);
        }

        foreach (scandir($dir) as $item) {
            if ($item == '.' || $item == '..') {
                continue;
            }

            if (!$this->deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
                return false;
            }

        }

        return rmdir($dir);
    }

    private function create_video($vttFile){
        $model = new Main_model();

        if(!isset($_SESSION['video']['id'])){
            $res = $model->create_video([
                'video_title'=>'', 'video_url'=>$_SESSION['video']['url'],
                'vtt_url'=>$vttFile['url'], 'subtitle_title'=>$vttFile['original_title'],
                'creator_ip'=>$_SESSION['video']['ip'], 'creator_user_agent'=>$this->request->getUserAgent()
            ]);
            if($res) {
                $_SESSION['video']['id'] = $res['video_id'];
                $_SESSION['video']['vtt']['id'] = $res['vtt_id'];
            }
        }else{
            $res = $model->create_video_subtitle([
                'video_id'=>$_SESSION['video']['id'],
                'vtt_url'=>$vttFile['url'], 'subtitle_title'=>$vttFile['original_title']
            ]);
            if($res){
                $_SESSION['video']['vtt']['id'] = $res;
            }
        }

        if(!$res){
            $vttFile = str_ireplace(base_url() . '/', FCPATH, $vttFile);
            unlink($vttFile);
        }

        return $res;
    }

    private function get_original_title($file){
        $ex = explode('/', $file);
        $ex = explode('.', $ex[count($ex)-1]);
        unset($ex[count($ex)-1]);
        return implode('.', $ex);
    }

    private function get_srt($addr, $fl, $newfile, $mime)
    {
        if (!file_exists($addr . $newfile)) {
            output_api(['msg' => lang('main.file_not_exists')], 422, 1009);
        }

        if ($mime == 'zip') {
            $zip = new \ZipArchive;
            $res = $zip->open($addr . $newfile);

            if ($res !== TRUE) {
                output_api(['msg' => lang('main.file_counld_not_be_opened')], 204, 1010);
            }

            $zip->extractTo($addr . $fl);
            $zip->close();

            $files = $this->rglob($addr . $fl . '/*.srt');

            if(!empty($files)){
                foreach ($files as $file) {
                    $newname = md5(microtime() . rand(10000, 99999)).'.srt';
                    rename($file, $addr . $newname);
                    $finalSRT = $addr . $newname;
                    break;
                }
            }else{
                $this->deleteDirectory($addr . $fl);
                unlink($addr . $newfile);
                output_api(['msg' => lang('main.srt_file_not_found')], 404, 1011);
            }

            $this->deleteDirectory($addr . $fl);
            unlink($addr . $newfile);
            return $finalSRT;

        } elseif ($mime == 'srt') {
            return $addr . $newfile;
        }
    }

    private function create_vtt($addr, $fl, $newfile, $mime)
    {
        $srt = $this->get_srt($addr, $fl, $newfile, $mime);

        $fileContents = file_get_contents($srt);

        $fileContents = preg_replace('/(\d+),(\d+)/i', '$1.$2', $fileContents);

        file_put_contents($srt, "WEBVTT\r\r" . $fileContents);

        $ex = explode('.', $srt);
        $ex[count($ex) - 1] = 'vtt';
        $vtt = implode('.', $ex);
        rename($srt, $vtt);

        $vtt = str_ireplace(FCPATH, base_url() . '/', $vtt);
        $_SESSION['video']['vtt']['url'] = $vtt;
        return ['vtt'=>$vtt, 'original_title'=>$original_title];
    }

    //--------------------------------------------------------------------

}
