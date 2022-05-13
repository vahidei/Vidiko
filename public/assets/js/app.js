var video_url = '';
$(document).ready(function () {

    $(document).on('focus', '#video-url', function () {
        $('#toast-homeMsg').fadeOut(200, function () {
            $(this).remove();
        })
        $('#video-url').removeAttr('data-toggle');
        $('#video-url').removeAttr('title');
        $('#video-url').tooltip('hide');
    });

    $(document).on('click', '.closeAlertBox', function(){
        $('.alertBox').fadeOut(200, function(){
            $(this).remove();
        });
    });

    $(document).on('keypress click mouseup keyup keydown onpaste mouseover', '#video-url', function () {
        if ($(this).val() !== '') {
            $(this).css({textAlign: 'left', direction: 'ltr'});
        } else {
            $(this).css({textAlign: 'right', direction: 'rtl'});
        }
    });

    $(document).on('click', '.startBtn', function (e) {
        e.preventDefault()

        $(this).find('i').removeClass('fa-chevron-left').addClass('spinner-border').css({marginTop: '4px'});
        var that = this;
        if ($(this).hasClass('disabled')) {
            return false;
        }

        if (!isValidHttpUrl($('#video-url').val())) {
            $('#video-url').attr('data-toggle', 'tooltip');
            $('#video-url').attr('title', 'آدرس ویدئو رو وارد نکردی');
            $('#video-url').tooltip('show');
            $(this).find('i').removeClass('spinner-border').addClass('fa-chevron-left').css({marginTop: '0px'});
        } else {
            $(this).addClass('disabled').prop('disabled', 'disabled');
            $.ajax({
                type: 'POST',
                url: base_url + '/main/check_video_url',
                dataType: 'json',
                data: {url: $('#video-url').val()},
                success: function () {
                    $(that).removeClass('disabled').prop('disabled', false);
                    $('#main').addClass('step2');

                    $('#main #step2_layer').prepend([
                        {
                            success_message: 'ویدئو بارگزاری شد. حالا زیرنویس خودت رو انتخاب کن'
                        }
                    ].map(step2_template).join(''));
                    video_url = $('#video-url').val();
                },
                error: function (data) {
                    $(that).removeClass('disabled').prop('disabled', false);
                    $(that).find('i').removeClass('spinner-border').addClass('fa-chevron-left').css({marginTop: '0px'});
                    data = data.responseJSON;
                    if (data.error_code == 999) {
                        runToast(data.data.msg + '<br/>' + echoCode(data.error_code), 'bg-danger', true, 5000);
                    } else {
                        $('#video-url').attr('data-toggle', 'tooltip');
                        $('#video-url').attr('title', 'آدرسی که وارد کردی اشتباهه');
                        $('#video-url').tooltip('show');
                    }
                }
            });

        }

    });

    $('#subUrlBtn').on('click', function (e) {
        e.preventDefault();

        if (!isValidHttpUrl($('#subUrlBar').val())) {
            $('#subUrlBar').attr('data-toggle', 'tooltip');
            $('#subUrlBar').attr('title', 'آدرس فایل زیر نویس رو وارد نکردی');
            $('#subUrlBar').tooltip('show');
            return false;

        }

        $(this).parent().parent().parent().parent().parent().prepend(loading_tmp('در حال پردازش', ''));
        lock_tabs(1);

        $.ajax({
            type: 'POST',
            url: base_url + '/main/send_url',
            dataType: 'json',
            data: {url: $('#subUrlBar').val()},
            success: function (data) {
                lock_tabs(0);
                remove_loading();
                display_step3_layer(data.data.vtt);
            },
            error: function (data) {
                lock_tabs(0);
                remove_loading();
                data = data.responseJSON;
                runToast(data.data.msg + '<br/>' + echoCode(data.error_code), 'bg-danger');
            }
        });
    });

    $(document).on('change', '#subtitleBgColorInput', function () {
        change_caption_style('background', $(this).val());
    });

    $(document).on('change', '#subtitleColorInput', function () {
        change_caption_style('color', $(this).val());
    });

    $(document).on('change', '#subtitleFontSizeInput', function () {
        change_caption_style('fontSize', $(this).val());
    });

    $(document).on('click', '.subtitleOffsetBtn[data-offset]', function () {
        if ($(this).data('offset') == 'in') {
            setOffset('video', 0.5);
        } else if ($(this).data('offset') == 'de') {
            setOffset('video', -0.5);
        }
    });

    $(document).on('click', '.subtitlePositionBtn[data-pos]', function () {

        if ($(this).data('pos') == 'right') {
            change_caption_style('left', 5);
        } else if ($(this).data('pos') == 'down') {
            change_caption_style('top', 5);
        } else if ($(this).data('pos') == 'up') {
            change_caption_style('top', -5);
        } else if ($(this).data('pos') == 'left') {
            change_caption_style('left', -5);
        }

    });

    $(document).on('click', '#createLink', function () {
        $(this).append(
            '  <span class="spinner-border spinner-border-sm ml-1" style="vertical-align: middle" role="status" aria-hidden="true"></span>'
        ).addClass('disabled').prop('disabled', true);
        var that = this;
        $.ajax({
            type: 'POST',
            url: base_url + '/main/create_link',
            dataType: 'json',
            success: function (data) {
                var link = base_url + '/watch/' + data.data.code;
                $(that).find('.spinner-border').remove();
                $(that).removeClass('disabled').prop('disabled', false);
                $('body').prepend(popup_success('با موفقیت انجام شد', link));
            },
            error: function (data) {
                data = data.responseJSON;
                runToast(data.data.msg + '<br/>' + echoCode(data.error_code), 'bg-danger');
            }
        });
    });

});

var $fileInput = $('.file-input');
var $droparea = $('.file-drop-area');

$fileInput.on('dragenter focus click', function () {
    $droparea.addClass('is-active');
});

$fileInput.on('dragleave blur drop', function () {
    $droparea.removeClass('is-active');
});

$fileInput.on('change', function () {
    var filesCount = $(this)[0].files.length;
    var $textContainer = $(this).prev();

    if (filesCount === 1) {
        var fileName = $(this).val().split('\\').pop();
        $textContainer.text(fileName);
    } else {
        $textContainer.text('هیچ زیر نویسی رو انتخاب نکردی!');
    }

    $(this).parent().parent().prepend(loading_tmp('در حال بارگزاری', 'uploading'));
    lock_tabs(1);

    var formData = new FormData();
    formData.append('file', $(this)[0].files[0]);
    $.ajax({
        url: base_url + '/main/upload_file',
        data: formData,
        type: 'POST',
        contentType: false,
        processData: false,
        success: function (data) {
            lock_tabs(0);
            remove_loading();
            runToast(data.data.msg, 'bg-success', 'true', '5000');
            display_step3_layer(data.data.vtt);
        },
        error: function (data) {
            lock_tabs(0);
            remove_loading();
            data = data.responseJSON;
            runToast(data.data.msg + '<br/>' + echoCode(data.error_code), 'bg-danger');
        }
    });
});

function change_caption_style(change, value) {

    var styles = {
        top: parseFloat($(".plyr__caption").css('top')),
        left: parseFloat($(".plyr__caption").css('left')),
        color: $(".plyr__caption").css('color'),
        background: $(".plyr__caption").css('background-color'),
        fontSize: $(".plyr__caption").css('font-size')
    };

    if (change == 'top' || change == 'left') {
        styles[change] = parseFloat($(".plyr__caption").css(change)) + value;
    } else if (change == 'fontSize') {
        styles[change] = value + 'px !important';
    } else {
        styles[change] = value + ' !important';
    }

    var css = '.plyr__caption{ top: ' + styles.top + 'px !important; left:' + styles.left + 'px !important;' +
        'color: ' + styles.color + '; background-color:' + styles.background + '; font-size:' + styles.fontSize + ';}';
    if ($('style[role="caption"]').length) {
        $('style[role="caption"]').html(css)
    } else {
        $('head').append('<style role="caption">' + css + '</style>');
    }


}

function display_step3_layer(vtt) {
    var video = $('#main #step3_layer video')[0];
    video.src = video_url;

    $('#main #step3_layer video track').attr('src', vtt);
    var plyr = new Plyr('#video', {
        captions: {
            active: true,
            language: 'fa',
            update: true,
            mode: 'showing'
        },
        i18n: {'speed': 'سرعت', 'captions': 'زیر نویس', 'normal': 'معمولی'},
        controls: [
            'play',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume',
            'settings',
            'fullscreen'
        ],
        //     ads: {
        //      enabled: true,
        //       tagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator='
        //   }
    });

    plyr.on('play', function () {
        var video = $('#main #step3_layer video')[0];
        video.textTracks[0].mode = 'showing';
    });

    window.player = plyr;

    $('.plyr__controls__item.plyr__menu').prepend(
        '<button aria-haspopup="true" aria-controls="plyr-subtitle-custom-setting-2114" aria-expanded="false" type="button" class="plyr__control" data-plyr="subtitle-custom-setting">' +
        'تنظیمات زیر نویس' +
        '<span class="plyr__sr-only">Caption controls</span>' +
        '</button>'
    )

    $('.plyr__controls').prepend(
        '<div hidden class="plyr-subtitle-custom-setting" id="plyr-subtitle-custom-setting-2114"><div><div id="">' +
        '<div role="menu">' +
        '<div class="d-flex">' +
        '<div class="flex-fill  rtl">' +
        '<div class="w-100 lead small mb-2 text-center">جلو / عقب بردن</div>' +
        '<div class="w-100 d-flex justify-content-center">' +
        '<div class="px-1"><a class="btn btn-sm btn-light subtitleOffsetBtn" data-offset="in" style="font-size:12px">+0.5 ثانیه </a></div>' +
        '<div class="px-1"><a class="btn btn-sm btn-light subtitleOffsetBtn" data-offset="de" style="font-size:12px">-0.5 ثانیه</a></div>' +
        '</div>' +
        '</div>' +
        '<div class="flex-fill  rtl">' +
        '<div class="w-100 lead small mb-2 text-center">تغییر موقعیت</div>' +
        '<div class="w-100 d-flex justify-content-center">' +
        '<div class="px-1"><a class="btn btn-sm btn-light subtitlePositionBtn" data-pos="right" style="font-size:12px"><i class="fa fa-arrow-right"></i></a></div>' +
        '<div class="px-1"><a class="btn btn-sm btn-light subtitlePositionBtn" data-pos="down" style="font-size:12px"><i class="fa fa-arrow-down"></i></a></div>' +
        '<div class="px-1"><a class="btn btn-sm btn-light subtitlePositionBtn" data-pos="up" style="font-size:12px"><i class="fa fa-arrow-up"></i></a></div>' +
        '<div class="px-1"><a class="btn btn-sm btn-light subtitlePositionBtn" data-pos="left" style="font-size:12px"><i class="fa fa-arrow-left"></i></a></div>' +
        '</div>' +
        '</div>' +
        '<div class="flex-fill  rtl">' +
        '<div class="w-100 lead small mb-2 text-center">اندازه فونت</div>' +
        '<div class="w-100 d-flex justify-content-center">' +
        '<div class="px-1"><input style="width:60px" id="subtitleFontSizeInput" value="18" type="number" class="form-control form-control-sm"></div>' +
        '</div>' +
        '</div>' +
        '<div class="flex-fill  rtl">' +
        '<div class="w-100 lead small mb-2 text-center">رنگ فونت</div>' +
        '<div class="w-100 d-flex justify-content-center">' +
        '<div class="px-1"><input type="color" id="subtitleColorInput" value="#ffffff" class="form-control-sm"></div>' +
        '</div>' +
        '</div>' +
        '<div class="flex-fill  rtl">' +
        '<div class="w-100 lead small mb-2 text-center">رنگ پس زمینه</div>' +
        '<div class="w-100 d-flex justify-content-center">' +
        '<div class="px-1"><input type="color" id="subtitleBgColorInput" value="#000000" class="form-control-sm"></div>' +
        '</div>' +
        '</div>' +
        '' +
        '</div>' +
        '</div>' +
        '</div></div></div>'
    );

    $(document).on('click', '.plyr__controls__item.plyr__menu button[aria-controls="plyr-subtitle-custom-setting-2114"]', function () {
        $('#plyr-subtitle-custom-setting-2114').prop('hidden', !($('#plyr-subtitle-custom-setting-2114').is(':hidden')));
    });


    $('#main').addClass('step3').removeClass('step2');
}

function echoCode(code) {
    return '<lead class="small" style="color:#ccc">کد: ' + code + '</lead>';
}

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

function lock_tabs(lock) {
    if (lock) {
        $('#selectSubTabs .nav-link:not(.active)').addClass('disabled');
    } else {
        $('#selectSubTabs .nav-link:not(.active)').removeClass('disabled');
    }
}

function remove_loading() {
    $('body .loading-overlayer').fadeOut(200, function () {
        $(this).remove();
    });
}

function loading_tmp(text, cls) {
    $('body .loading-overlayer').remove();
    return `<div class="loading-overlayer ${cls}">
    <div class="loading-box">
        <div class="loading-img">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="266pt" height="292pt" viewBox="0 0 266 292" version="1.1">
                <defs>
                    <image id="image5" width="215" height="196" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANcAAADECAIAAACDXSPXAAAABmJLR0QA/wD/AP+gvaeTAAACCElEQVR4nO3SQQEAEADAQCRTRf8QxJjHXYI9Nu8+A1KrDgAX8gEX0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nMhPRfScyE9F9JzIT0X0nuUtgMo6AdD+wAAAABJRU5ErkJggg=="/>
                    <pattern id="pattern0" patternUnits="userSpaceOnUse" width="215" height="196"  patternTransform="matrix(1,0,0,1,51,48)">
                        <use xlink:href="#image5"/>
                    </pattern>
                    <image id="image8" width="216" height="196" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAADECAIAAAByVnhaAAAABmJLR0QA/wD/AP+gvaeTAAACJElEQVR4nO3SMQHAMAzAsKzIRmX8Qaww4kNC4MPP/34D2852AMwYkQgjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjknABFQwDKIAr1n4AAAAASUVORK5CYII="/>
                    <pattern id="pattern1" patternUnits="userSpaceOnUse" width="216" height="196"  patternTransform="matrix(1,0,0,1,0,96)">
                        <use xlink:href="#image8"/>
                    </pattern>
                    <image id="image11" width="216" height="196" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAADECAIAAAByVnhaAAAABmJLR0QA/wD/AP+gvaeTAAACJElEQVR4nO3SMQHAMAzAsKzIRmX8Qaww4kNC4MPP/34D2852AMwYkQgjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjkmBEEoxIghFJMCIJRiTBiCQYkQQjknABFQwDKIAr1n4AAAAASUVORK5CYII="/>
                    <pattern id="pattern2" patternUnits="userSpaceOnUse" width="216" height="196" >
                        <use xlink:href="#image11"/>
                    </pattern>
                </defs>
                <g id="surface1">
                    <path style=" stroke:none;fill-rule:nonzero;fill:url(#pattern0);" d="M 167 60.375 C 167 56.25 166.207031 53.292969 164.625 51.5 C 163.042969 49.707031 160.941406 48.8125 158.328125 48.8125 C 155.714844 48.8125 153.613281 49.707031 152.03125 51.5 C 150.449219 53.292969 149.65625 56.25 149.65625 60.375 L 149.65625 137.203125 L 63.328125 137.203125 C 59.191406 137.203125 56.230469 138.03125 54.4375 139.6875 C 52.644531 141.34375 51.75 143.410156 51.75 145.890625 C 51.75 148.503906 52.644531 150.636719 54.4375 152.289063 C 56.230469 153.941406 59.191406 154.765625 63.328125 154.765625 L 149.65625 154.765625 L 149.65625 231.59375 C 149.65625 235.730469 150.449219 238.691406 152.03125 240.484375 C 153.613281 242.277344 155.714844 243.171875 158.328125 243.171875 C 160.941406 243.171875 163.042969 242.277344 164.625 240.484375 C 166.207031 238.691406 167 235.730469 167 231.59375 L 167 154.765625 L 253.75 154.765625 C 257.886719 154.765625 260.847656 153.941406 262.632813 152.289063 C 264.417969 150.636719 265.3125 148.574219 265.3125 146.09375 C 265.3125 143.480469 264.417969 141.34375 262.632813 139.6875 C 260.847656 138.03125 257.886719 137.203125 253.75 137.203125 L 167 137.203125 L 167 60.375 "/>
                    <path style=" stroke:none;fill-rule:nonzero;fill:url(#pattern1);" d="M 116.453125 108.34375 C 116.453125 104.21875 115.660156 101.261719 114.078125 99.46875 C 112.496094 97.675781 110.394531 96.78125 107.78125 96.78125 C 105.167969 96.78125 103.066406 97.675781 101.484375 99.46875 C 99.902344 101.261719 99.109375 104.21875 99.109375 108.34375 L 99.109375 185.171875 L 12.78125 185.171875 C 8.644531 185.171875 5.683594 186 3.890625 187.65625 C 2.097656 189.3125 1.203125 191.378906 1.203125 193.859375 C 1.203125 196.472656 2.097656 198.605469 3.890625 200.257813 C 5.683594 201.910156 8.644531 202.734375 12.78125 202.734375 L 99.109375 202.734375 L 99.109375 279.5625 C 99.109375 283.699219 99.902344 286.660156 101.484375 288.453125 C 103.066406 290.246094 105.167969 291.140625 107.78125 291.140625 C 110.394531 291.140625 112.496094 290.246094 114.078125 288.453125 C 115.660156 286.660156 116.453125 283.699219 116.453125 279.5625 L 116.453125 202.734375 L 203.203125 202.734375 C 207.339844 202.734375 210.300781 201.910156 212.085938 200.257813 C 213.871094 198.605469 214.765625 196.542969 214.765625 194.0625 C 214.765625 191.449219 213.871094 189.3125 212.085938 187.65625 C 210.300781 186 207.339844 185.171875 203.203125 185.171875 L 116.453125 185.171875 L 116.453125 108.34375 "/>
                    <path style=" stroke:none;fill-rule:nonzero;fill:url(#pattern2);" d="M 116.453125 12.421875 C 116.453125 8.296875 115.660156 5.339844 114.078125 3.546875 C 112.496094 1.753906 110.394531 0.859375 107.78125 0.859375 C 105.167969 0.859375 103.066406 1.753906 101.484375 3.546875 C 99.902344 5.339844 99.109375 8.296875 99.109375 12.421875 L 99.109375 89.25 L 12.78125 89.25 C 8.644531 89.25 5.683594 90.078125 3.890625 91.734375 C 2.097656 93.390625 1.203125 95.457031 1.203125 97.9375 C 1.203125 100.550781 2.097656 102.683594 3.890625 104.335938 C 5.683594 105.988281 8.644531 106.8125 12.78125 106.8125 L 99.109375 106.8125 L 99.109375 183.640625 C 99.109375 187.777344 99.902344 190.738281 101.484375 192.53125 C 103.066406 194.324219 105.167969 195.21875 107.78125 195.21875 C 110.394531 195.21875 112.496094 194.324219 114.078125 192.53125 C 115.660156 190.738281 116.453125 187.777344 116.453125 183.640625 L 116.453125 106.8125 L 203.203125 106.8125 C 207.339844 106.8125 210.300781 105.988281 212.085938 104.335938 C 213.871094 102.683594 214.765625 100.621094 214.765625 98.140625 C 214.765625 95.527344 213.871094 93.390625 212.085938 91.734375 C 210.300781 90.078125 207.339844 89.25 203.203125 89.25 L 116.453125 89.25 L 116.453125 12.421875 "/>
                </g>
            </svg>

        </div>
        <div class="loading-text">
            ${text}
        </div>
    </div>
</div>`;
}

function runToast(msg, bg, autohide, delay) {
    if (msg.length < 1) return false;
    if (bg == undefined) {
        bg = 'bg-success';
    }
    if (autohide == undefined) {
        autohide = 'false';
    }
    if (delay == undefined) {
        delay = '0';
    }
    $('#response-toast').remove();

    $('body').append(
        '<div class="toast fade text-white ' + bg + '" role="alert" data-delay="' + delay + '" data-autohide="' + autohide + '" id="response-toast" style="position: fixed;z-index: 10000;left: 15px;bottom: 45px;max-width: calc(100% - 30px);width: 400px;">\n' +
        '    <div class="toast-header" style="background: transparent;direction: rtl;text-align: right;"><button class="close ml-2 mb-1 close text-white" data-dismiss="toast"><span aria-hidden="true">×</span></button></div>\n' +
        '    <div class="toast-body rtl" role="alert">\n' +
        '        <p class="lead">' + msg + '</p>\n' +
        '    </div>\n' +
        '</div>'
    );
    $('.toast').toast('show');
}

function setOffset(videoId, offset) {
    var video = document.getElementById(videoId);
    if (video) {
        Array.from(video.textTracks).forEach((track) => {
            if (track.mode === 'showing') {
                Array.from(track.cues).forEach((cue) => {
                    cue.startTime += offset
                    cue.endTime += offset
                });
                return true;
            }
        });
    }
    return false;
}

function moveY(videoId, direction) {
    var video = document.getElementById(videoId);
    if (video) {
        Array.from(video.textTracks).forEach((track) => {
            if (track.mode === 'showing') {
                Array.from(track.cues).forEach((cue) => {
                    if (direction == 'u') {
                        if (!isNaN(cue.line)) {
                            cue.line -= 1;
                        } else {
                            cue.line = 15;
                        }
                    } else if (direction == 'd') {
                        if (!isNaN(cue.line)) {
                            cue.line += 1;
                        } else {
                            cue.line = 16;
                        }
                    }
                });
                return true;
            }
        });
    }
    return false;
}

function moveX(videoId, percent, direction) {
    var video = document.getElementById(videoId);
    if (video) {
        Array.from(video.textTracks).forEach((track) => {
            if (track.mode === 'showing') {
                Array.from(track.cues).forEach((cue) => {
                    if (direction == 'l') {
                        if (!isNaN(cue.position)) {
                            cue.position -= percent || 5;
                        } else {
                            cue.position = 50 - percent;
                        }
                    } else if (direction == 'r') {
                        if (!isNaN(cue.position)) {
                            cue.position += percent || 5;
                        } else {
                            cue.position = 50 + percent;
                        }
                    }

                });
                return true;
            }
        });
    }
    return false;
}

function setFontSize(fontSize) {
    const css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = `::cue { font-size: ${fontSize}px; }`;
    document.body.appendChild(css);
}

function setFontColor(fontColor) {
    const css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = `::cue { color: ${fontColor}; }`;
    document.body.appendChild(css);
}

function setFontBgColor(fontColor) {
    const css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = `::cue { background: ${fontColor}; }`;
    document.body.appendChild(css);
}

function tick() {
    return `<svg class="ft-green-tick" xmlns="http://www.w3.org/2000/svg" height="70" width="70" viewBox="0 0 48 48" aria-hidden="true">
                <circle class="circle" fill="#5bb543" cx="24" cy="24" r="22"/>
                <path class="tick" fill="none" stroke="#FFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M14 27l5.917 4.917L34 17"/>
            </svg>`;
}

function popup_success(msg, link){
    return `<div class="alertBox animate zoomIn bg-white p-5">
                <div class="position-absolute closeAlertBox right-0 top-0 m-2 p-2 h5 cursor-pointer text-grey">
                    <i class="fa fa-times"></i>
                </div>
                <div class="text-center">${tick()}<br/>
                <div class="text-success h5 mt-3 mb-4">${msg}</div><br/></div>
                <div class="input-group mb-3">
                  <input type="text" class="form-control border watchLinkInput bg-white" readonly aria-readonly="true" value="${link}">
                  <div class="input-group-append">
                    <button class="btn btn-light lead border shadow-none" onclick="copy_to_clipboard('.watchLinkInput', this)" type="button">
                        <i class="fa fa-copy"></i>
                    </button>
                  </div>
                </div>
            </div>`;
}

function copy_to_clipboard(ele, that){

    var str = $(ele).get(0);
    str.select();
    document.execCommand('copy');

    $(that).html('<span class="lead small">کپی شد</span>').addClass('disabled').prop('disabled', true);
    setTimeout(function(){
        $(that).html('<i class="fa fa-copy"></i>').removeClass('disabled').prop('disabled', false);
    }, 3000);
}