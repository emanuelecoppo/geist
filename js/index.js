$('#main2, #main3').hide();

$('#nav1').click(function() {
  $('#main2, #main3').hide();
  $('#main1').show();
});
$('#nav2').click(function() {
  $('#main1, #main3').hide();
  $('#main2').show();
});
$('#nav3').click(function() {
  $('#main1, #main2').hide();
  $('#main3').show();
});
