////////////////////////////////////////////////// WINDOW RESIZE

function windowResize() {
  w = $(window).width();
  if (w <= 750) {
    $('#videoList').insertAfter($('#player'));
    $('#staff').insertBefore($('#contact'));
    $('#contact_1').insertBefore($('#staff'));
    $('#area').addClass('small');
  } else {
    $('#videoList').insertBefore($('#player'));
    $('#staff').insertAfter($('#contact'));
    $('#contact_1').insertBefore($('#contact_2'));
    $('#area').removeClass('small');
  }
  if (w > 1280) {
    $('body').css('zoom', w/1280);
  } else {
    $('body').css('zoom', 'initial');
  }
}
$(window).resize(windowResize);
windowResize();

////////////////////////////////////////////////// POPUP + ACCESSO

function checkbox() {
  $('#procedi').toggleClass('non-active pointer');
}
$('#procedi').click(function() {
  if (!$(this).hasClass('non-active')) {
    window.location.href = 'test.html';
  }
});
function popup() {
  $('.popup').toggleClass('invisible');
}

////////////////////////////////////////////////// LANG

var lang = decodeURIComponent(window.location.search).substring(1);

if (lang=='de') {
  $('[lang=it]').hide();
  $('[lang=de]').show();
  $('#lang a:nth-child(1)').addClass('underline');
} else {
  $('[lang=de]').hide();
  $('[lang=it]').show();
  $('#lang a:nth-child(2)').addClass('underline');
}

////////////////////////////////////////////////// NAV

$('#main2, #main3').hide();

$('#nav1').click(function() {
  $('#main2, #main3').hide();
  $('#main1').show();
  $('.nav').removeClass('navActive');
  $(this).addClass('navActive');
});
$('#nav2').click(function() {
  $('#main1, #main3').hide();
  $('#main2').show();
  $('.nav').removeClass('navActive');
  $(this).addClass('navActive');
});
$('#nav3').click(function() {
  $('#main1, #main2').hide();
  $('#main3').show();
  $('.nav').removeClass('navActive');
  $(this).addClass('navActive');
});

////////////////////////////////////////////////// MAIN 1 (FILMATI)

var videoNum = 1;
var video = $('video');
var percentage = 0;

function videoChange() {
  $('.videoNum').removeClass('underline');
  $('.videoNum[number='+ videoNum +']').addClass('underline');
  video.attr('src', 'video/'+ (videoNum) +'.mp4');
  $('#progress').css('width', '0%');
}
videoChange();

// PLAY OVERLAY
function checkLoad() {
  if (video[0].readyState === 4) {
    $('#playOverlay').show();
  } else {
    setTimeout(checkLoad, 100);
  }
}
checkLoad();
// LISTA
$('.videoNum').click(function() {
  videoNum = parseFloat($(this).attr('number'));
  $('.videoNum').removeClass('underline');
  videoChange();
});
// CONTROLS
function videoToggle() {
  if (video[0].paused==true) {
    video[0].play();
    $('.play').attr('src', 'icons/pause.svg');
    $('#playOverlay').hide();
  }
  else if (video[0].paused==false) {
    video[0].pause();
    $('.play').attr('src', 'icons/play.svg');
    $('#playOverlay').show();
  }
}
function videoStop() {
  video[0].pause();
  video[0].currentTime = 0;
  $('.play').attr('src', 'icons/play.svg');
  $('#playOverlay').show();
}
function videoPrev() {
  if (videoNum > 1 && videoNum <= 6) {
    videoNum --;
    videoChange();
    $('.play').attr('src', 'icons/play.svg');
    videoToggle();
  }
}
function videoNext() {
  if (videoNum >= 1 && videoNum < 6) {
    videoNum ++;
    videoChange();
    $('.play').attr('src', 'icons/play.svg');
    videoToggle();
  }
}
// ON ENDED
video.on('ended', function() {
  videoNext();
  video[0].play();
});
// FULLSCREEN
function videoFull() {
    if (video[0].requestFullscreen) {
      video[0].requestFullscreen();
    } else if (video[0].mozRequestFullScreen) {
      video[0].mozRequestFullScreen();
    } else if (video[0].webkitRequestFullscreen) {
      video[0].webkitRequestFullscreen();
    }
}
// PROGRESS
video[0].addEventListener('timeupdate', updateProgress);
function updateProgress() {
   var percentage = Math.floor((100 / video[0].duration) * video[0].currentTime);
   $('#progress').css('width', percentage +'%');
}

////////////////////////////////////////////////// MAIN 2 (LA MACCHINA)

var galleryNum = 1;
$('.galleryImg').hide();
$('.galleryImg:nth-child('+ galleryNum +')').show();
$('.galleryNum[number='+ galleryNum +']').addClass('underline');
// NUMERI
$('.galleryNum').click(function() {
  galleryNum = parseFloat($(this).attr('number'));
  $('.galleryImg').hide();
  $('.galleryImg:nth-child('+ galleryNum +')').show();
  $('.galleryNum').removeClass('underline');
  $(this).addClass('underline');
});
// INDIETRO
$('#galleryPrev').click(function() {
  galleryNum = parseFloat($('.galleryNum.underline').attr('number'));
  if (galleryNum > 1 && galleryNum <= 6) {
    $('.galleryImg').hide();
    $('.galleryImg:nth-child('+ (galleryNum-1) +')').show();
    $('.galleryNum').removeClass('underline');
    $('.galleryNum[number='+ (galleryNum-1) +']').addClass('underline');
  }
});
// AVANTI
$('#galleryNext').click(function() {
  galleryNum = parseFloat($('.galleryNum.underline').attr('number'));
  if (galleryNum >= 1 && galleryNum < 6) {
    $('.galleryImg').hide();
    $('.galleryImg:nth-child('+ (galleryNum+1) +')').show();
    $('.galleryNum').removeClass('underline');
    $('.galleryNum[number='+ (galleryNum+1) +']').addClass('underline');
  }
});
