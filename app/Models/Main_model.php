<?php

namespace App\Models;


class Main_model
{

    function create_link($data){
        $db = db_connect();
        $table = $db->table('links');
        $user = (isset($_SESSION['user'])) ? $_SESSION['user']['id'] : '0';
        $code_result = false;
        $table->set('created_at', 'NOW()', false);
        helper('text');
        while($code_result == false){


            $code = random_string('alnum', 6);

            $ins = $table->insert([
                'user' => $user,
                'video_id' => $data['id'],
                'vtt_id' => $data['vtt']['id'],
                'code' => $code
            ]);

            if($ins){
                $code_result = true;
            }else{
                $err = $db->error();
                if($err['code'] == 1062){
                    $code_result = false;
                }else{
                    return false;
                }
            }
        }

        return $code;
    }

    function create_video_subtitle($data){
        $db = db_connect();
        $table = $db->table('subtitles');
        $ins = $table->insert([
            'video_id'=>$data['video_id'],
            'title'=>$data['subtitle_title'],
            'url'=>$data['vtt_url'],
            'status'=>'pending'
        ]);

        return ($ins) ? $db->insertID() : false;
    }

    function create_video($data){
        $db = db_connect();
        $table = $db->table('videos');

        $table->set('created_at', 'NOW()', false);
        $db->transStart();

        $user = (isset($_SESSION['user'])) ? $_SESSION['user']['id'] : '0';

        $table->insert([
            'user' => $user,
            'video_title' => $data['video_title'],
            'video_url' => $data['video_url'],
            'creator_ip' => $data['creator_ip'],
            'creator_user_agent' => $data['creator_user_agent']

        ]);

        $vid_id = $db->insertID();
        $table = $db->table('subtitles');
        $table->insert([
            'video_id'=>$vid_id,
            'title'=>$data['subtitle_title'],
            'url'=>$data['vtt_url'],
            'status'=>'pending'
        ]);
        $vtt_id = $db->insertID();

        $db->transComplete();
        if(!$db->transStatus()){
            $db->transRollback();
            return false;
        }

        return ['video_id'=>$vid_id, 'vtt_id'=>$vtt_id];
    }

}