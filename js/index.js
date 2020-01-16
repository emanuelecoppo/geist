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

var videoNumber = 1;
$('.videoNum[number='+ videoNumber +']').children('.videoTitle').addClass('underline');
// NUMERI
$('.videoTitle').click(function() {
  videoNumber = parseFloat($(this).parent().attr('number'));
  $('.videoTitle').removeClass('underline');
  $(this).addClass('underline');
});

////////////////////////////////////////////////// MAIN 2 (LA MACCHINA)

var galleryNumber = 1;
$('.galleryImg').hide();
$('.galleryImg:nth-child('+ galleryNumber +')').show();
$('.galleryNum[number='+ galleryNumber +']').addClass('underline');
// NUMERI
$('.galleryNum').click(function() {
  galleryNumber = parseFloat($(this).attr('number'));
  $('.galleryImg').hide();
  $('.galleryImg:nth-child('+ galleryNumber +')').show();
  $('.galleryNum').removeClass('underline');
  $(this).addClass('underline');
});
// INDIETRO
$('#galleryPrev').click(function() {
  galleryNumber = parseFloat($('.galleryNum.underline').attr('number'));
  if (galleryNumber > 1 && galleryNumber <= 6) {
    $('.galleryImg').hide();
    $('.galleryImg:nth-child('+ (galleryNumber-1) +')').show();
    $('.galleryNum').removeClass('underline');
    $('.galleryNum[number='+ (galleryNumber-1) +']').addClass('underline');
  }
});
// AVANTI
$('#galleryNext').click(function() {
  galleryNumber = parseFloat($('.galleryNum.underline').attr('number'));
  if (galleryNumber >= 1 && galleryNumber < 6) {
    $('.galleryImg').hide();
    $('.galleryImg:nth-child('+ (galleryNumber+1) +')').show();
    $('.galleryNum').removeClass('underline');
    $('.galleryNum[number='+ (galleryNumber+1) +']').addClass('underline');
  }
});
