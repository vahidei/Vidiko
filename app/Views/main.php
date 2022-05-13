<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>خانه - ویدیکو</title>
    <meta name="theme-color" content="#f4ba01">
    <meta name="theme-color" content="#f4ba01">
    <link rel="icon" type="image/svg+xml" sizes="355x389" href="<?=base_url('public/assets/img/logo-vidiko.svg');?>">
    <link rel="icon" type="image/svg+xml" sizes="1248x389" href="<?=base_url('public/assets/img/vidiko.svg');?>">
    <link rel="stylesheet" href="<?=base_url('public/assets/bootstrap/css/bootstrap.min.css');?>">
    <link rel="manifest" href="manifest.json">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
    <link rel="stylesheet" href="<?=base_url('public/assets/fonts/fontawesome-all.min.css');?>">
    <link rel="stylesheet" href="<?=base_url('public/assets/fonts/font-awesome.min.css');?>">
    <link rel="stylesheet" href="<?=base_url('public/assets/fonts/fontawesome5-overrides.min.css');?>">
    <link rel="stylesheet" href="<?=base_url('public/assets/css/app.css');?>">
    <link rel="stylesheet" href="<?=base_url('public/assets/css/plyr.css');?>">
    <link rel="stylesheet" href="<?=base_url('public/assets/css/Apps-Menu-Google.css');?>">
    <link rel="stylesheet" href="<?=base_url('public/assets/css/Bootstrap-4---Tabs-with-Arrows.css');?>">
    <link rel="stylesheet" href="<?=base_url('public/assets/css/checks.css');?>">
    <link rel="stylesheet" href="<?=base_url('public/assets/css/Drag-and-Drop-File-Input.css');?>">
    <link rel="stylesheet" href="<?=base_url('public/assets/css/Drag-Drop-File-Input-Upload.css');?>">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');?>">
    <link rel="stylesheet" href="<?=base_url('public/assets/css/Search-Input-Responsive-with-Icon.css');?>">
    <script>
        const base_url = '<?=base_url();?>';
    </script>
</head>

<body class="text-right home" id="page-top" style="/*direction: rtl;*/height: 100%;position: relative;">

<div class="toast fade text-white hide" role="alert" data-autohide="false" id="toast-homeMsg" style="position: fixed;z-index: 10000;left: 15px;bottom: 45px;background: rgba(0,0,0,0.8);max-width: calc(100% - 30px);width: 400px;">
    <div class="toast-header" style="background: transparent;direction: rtl;text-align: right;"><button class="close ml-2 mb-1 close text-white" data-dismiss="toast"><span aria-hidden="true">×</span></button></div>
    <div class="toast-body" role="alert">
        <p class="lead">آدرس ویدئو خودت رو وارد کن و با انتخاب زیر نویس برای اون به راحتی فیلمت رو همراه با زیر نویس ببین</p>
    </div>
</div><a class="navbar-brand float-left vidiko-logo" href="#" style="width: 50px;/*min-width: 50px;*/height: 50px;padding: 0px 0px;/*max-width: 50px;*/min-height: 50px;max-height: 50px;margin: 0px;padding-left: 2px;text-align: left;background: rgba(255,255,255,0.55);border-radius: 4px;transition: ease .2s all;"><img class="bounce animated" src="<?=base_url('public/assets/img/logo-vidiko.svg');?>" style="width: auto;background: rgba(255,255,255,0);padding: 8px;border-radius: 4px;margin: 0px auto;height: 100%;"><img class="brand-text" src="<?=base_url('public/assets/img/vidiki-text.svg');?>" style="width: auto;height: 30px;opacity: 0;transition: ease .2s all;"></a><a class="menu-toggle rounded cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" class="bi bi-grid-3x3-gap-fill" style="font-size: 25px;padding-top: 0px;margin-top: -3px;">
        <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"></path>
    </svg></a>
<header class="d-flex masthead" style="background-image: url('<?=base_url('public/assets/img/bg-masthead.jpg');?>');padding: 100px 0px;border-style: none;height: auto;padding-top: 50px;min-height: 100%;">
    <div class="applist-container applist-growing-container">
        <ul class="app-list" style="border-radius: 0px;">
            <li class="app-list-item"><a class="app-list-item-container" href="#"><img src="<?=base_url('public/assets/img/vhome.svg');?>"><span>صفحه نخست</span></a></li>
            <li class="app-list-item"><a class="app-list-item-container" href="#"><img src="<?=base_url('public/assets/img/vaboutus.svg');?>"><span>درباره ما</span></a></li>
            <li class="app-list-item"><a class="app-list-item-container" href="#"><img src="<?=base_url('public/assets/img/vcontactus.svg');?>"><span>تماس با ما</span></a></li>
            <li class="app-list-item"><a class="app-list-item-container" href="#"><img src="<?=base_url('public/assets/img/vad.svg');?>"><span>تبلیغات</span></a></li>
            <li class="app-list-item"><a class="app-list-item-container" href="#"><img src="<?=base_url('public/assets/img/vcc.svg');?>"><span>زیر نویس ها</span></a></li>
            <li class="app-list-item"><a class="app-list-item-container" href="#"><img src="<?=base_url('public/assets/img/vsug.svg');?>"><span>پیشنهادها</span></a></li>
        </ul>
    </div>
    <div class="container text-center my-auto" id="main">
        <div class="text-center" id="brand_logo">
            <div class="row">
                <div class="col col-lg-8 offset-lg-2" style="padding-right: 80px;padding-left: 80px;">
                    <div id="brand_box">
                        <img class="img-fluid d-xl-flex justify-content-xl-end align-items-xl-start" src="<?=base_url('public/assets/img/vidiko-text-fa.svg');?>" width="100%" height="100px" style="width: 297px;margin: auto;">
                        <a class="float-right btn btn-sm btn-danger m-3" id="changeSubtitle" href="#" style="font-weight:lighter;display:none;padding-top: 0px;">
                            عوض کردن زیر نویس
                        </a>
                        <a class="float-right btn btn-sm btn-success my-3" id="createLink" href="#" style="font-weight:lighter;display:none;padding-top: 0px;">
                            دریافت لینک
                        </a>
                        <a class="float-right btn btn-sm btn-danger m-3" id="changeVideoUrl" href="#" style="font-weight:lighter;display:none;padding-top: 0px;">
                            عوض کردن آدرس ویدئو
                        </a>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center mt-5" id="video_input_row">
            <div class="row">
                <div class="col-md-10 offset-md-1">
                    <div class="card m-auto" style="max-width: 850px;background: rgb(255,255,255);height: 51px;margin: 0px;direction: rtl;">
                        <div class="card-body" style="background: rgba(255,255,255,0);padding: 0px;padding-right: 21px;padding-left: 0px;">
                            <form class="d-flex align-items-center"><i class="fa fa-link" style="color: rgba(33,37,41,0.52);height: 13px;"></i><input class="form-control form-control-lg flex-shrink-1 form-control-borderless" type="search" id="video-url" placeholder="آدرس ویدئو رو وارد کن" name="searchbar" style="background: rgba(255,255,255,0);"><button class="btn btn-lg shadow-none startBtn" type="submit" style="/*padding: 0px;*/padding-top: 0;padding-right: 20px !important;padding-bottom: 0;padding-left: 20px !important;height: auto;background: rgba(40,167,69,0);"><i class="fa fa-chevron-left" style="height: 20;padding-top: 9px;color: #f4ba01;"></i></button></form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="step2_layer">

            <div class="row mt-1" id="selectSubtitle">
                <div class="col-lg-8 offset-lg-2">
                    <div class="py-4 px-3 box rounded shadow mb-5">
                        <!-- Bordered tabs-->
                        <ul id="selectSubTabs" role="tablist" class="nav nav-tabs nav-pills with-arrow flex-column flex-sm-row text-center">
                            <li class="nav-item flex-sm-fill">
                                <a id="contact1-tab" data-toggle="tab" href="#contact1" role="tab" aria-controls="contact1" aria-selected="true" class="nav-link text-uppercase font-weight-bold  mr-sm-3 rounded-0 border">جستجو زیر نویس</a>
                            </li>
                            <li class="nav-item flex-sm-fill">
                                <a id="home1-tab" data-toggle="tab" href="#home1" role="tab" aria-controls="home1" aria-selected="false" class="nav-link text-uppercase font-weight-bold mr-sm-3 rounded-0 border">انتخاب از دستگاه</a>
                            </li>
                            <li class="nav-item flex-sm-fill">
                                <a id="profile1-tab" data-toggle="tab" href="#profile1" role="tab" aria-controls="profile1" aria-selected="false" class="nav-link text-uppercase font-weight-bold rounded-0 border active">وارد کردن آدرس</a>
                            </li>
                        </ul>
                        <div id="myTab1Content" class="tab-content">
                            <div id="contact1" role="tabpanel" aria-labelledby="contact-tab" class="tab-pane fade py-5" style="position:relative">
                                <div class="placeholder-coming-soon">
                                    <div class="text">
                                        <div>
                                            داریم دیتابیسمون رو تکمیل میکنیم.
                                        </div>
                                        <div class="mt-2">
                                            این امکان بزودی راه اندازی میشه.
                                        </div>
                                    </div>
                                </div>
                                <div class="card m-auto rtl blur" style="max-width:850px">
                                    <div class="card-body">
                                        <form class="row align-items-center">
                                            <div class="col-xl-1 d-none d-xl-block">
                                                <i class="fas fa-search d-none d-sm-block h4 text-success m-0 pl-1"></i>
                                            </div>
                                            <div class="col-lg-8">
                                                <input class="form-control form-control-lg form-control-borderless border-0 w-100" type="search" placeholder="اسم فیلمت رو اینجا بنویس" name="searchbar" />
                                            </div>
                                            <div class="col-xl-3 col-lg-4 mt-3 mt-lg-0">
                                                <button class="btn w-100 btn-success btn-lg" type="submit">جستجو</button>
                                            </div>
                                        </form>
                                    </div>

                                </div>


                            </div>
                            <div id="home1" role="tabpanel" aria-labelledby="home-tab" class="tab-pane fade py-5">
                                <div class="file-drop-area">
                                    <span class="btn-lg btn btn-danger mx-auto mx-md-0 rtl">انتخاب فایل زیر نویس</span><span class="file-msg d-none d-md-block rtl">
                                    یا میتونی فایل رو اینجا رها کنی
                                    <div class="small mt-2">فرمت فایل باید zip یا srt باشه</div>
                                </span><input type="file" class="file-input" /></div>
                            </div>
                            <div id="profile1" role="tabpanel" aria-labelledby="profile-tab" class="tab-pane fade py-5 show active">

                                <div class="card m-auto rtl" style="max-width:850px">
                                    <div class="card-body">
                                        <div class="row align-items-center">
                                            <div class="col-xl-1 d-none d-xl-block">
                                                <i class="fas fa-cc d-none d-sm-block h4 text-success vdk-text-color-1 m-0 pl-1"></i>
                                            </div>
                                            <div class="col-lg-8">
                                                <input class="form-control form-control-lg form-control-borderless border-0 w-100" type="search" placeholder="آدرس فایل زیر نویس رو وارد کن" id="subUrlBar" />
                                            </div>
                                            <div class="col-xl-3 col-lg-4 mt-3 mt-lg-0">
                                                <button class="btn w-100 btn-warning text-white vdk-bg-color-1 btn-lg" id="subUrlBtn">ارسال</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>

                        </div>
                        <!-- End bordered tabs -->
                    </div>
                </div>
            </div>
        </div>

        <div id="step3_layer">
            <div class="row mt-1">
                <div class="col col-lg-8 offset-lg-2 p-md-3 p-0">
                    <video controls style="top:0px" id="video" crossorigin>
                        <source src="" type="video/mp4">
                        <track src="" kind="subtitles" srcLang="fa" label="فارسی" default>
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>


        </div>

    </div>
    <footer>
        <p class="mb-0 small" style="color: #7e6b2d;font-family: 'Source Sans Pro', sans-serif;text-align: center;padding-top: 11px;">Copyright &nbsp;© Vahidey.ir 2021</p>
    </footer>
</header>
<script src="<?=base_url('public/assets/js/jquery.min.js');?>"></script>
<script src="<?=base_url('public/assets/bootstrap/js/bootstrap.min.js');?>"></script>
<script src="<?=base_url('public/assets/js/bs-init.js');?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
<script src="<?=base_url('public/assets/js/stylish-portfolio.js');?>"></script>
<script src="<?=base_url('public/assets/js/app.js');?>"></script>
<script src="<?=base_url('public/assets/js/plyr.min.js');?>"></script>
<script src="<?=base_url('public/assets/js/Drag-and-Drop-File-Input.js');?>"></script>
<script src="<?=base_url('public/assets/js/step2-template.js');?>"></script>
</body>

</html>