var timer = 0;
var current = 0;
var rnd;
var arr = [1,2,3,4,5,6];
var death = 1;
var deathHover = false;

// RANDOM DIV ORDER
function randomDivs() {
  var containers = $(".container");
  for (var i = 0; i < containers.length; i++) {
    var target1 = Math.floor(Math.random() * containers.length - 1) + 1;
    var target2 = Math.floor(Math.random() * containers.length - 1) + 1;
    containers.eq(target1).before(containers.eq(target2));
  }
}
randomDivs();

// RESET VIDEOS
function resetVideos() {
  current = 0;
  arr = [1,2,3,4,5,6];
  death = 1;
  deathHover = false;
  randomDivs();
  $('#video1').attr('src', 'video/morte/'+ randomInt(1, 6) +'.mp4')
  for (var i = 2; i <= 6; i++) {
    $('#video'+ i).attr('src', 'video/non_morte/'+ randomInt(1, 12) +'.mp4');
    $('#video'+ i).removeClass('death');
  }
}

// CURRENT VIDEO
$('.video').hover(
  function() {
    current = parseInt($(this).attr('number'));
    $(this).addClass('current');
    if ($(this).hasClass('death')) {deathHover = true} else {deathHover = false}
  },
  function() {
    $(this).removeClass('current');
  }
);

// LOOP FUNCTION
window.setInterval(function() {

  // NEXT VIDEO
  $('.video.death').on('ended', function() {
    $(this).attr('src', 'video/morte/'+ randomInt(1, 6) +'.mp4');
  })
  $('.video:not(.death)').on('ended', function() {
    $(this).attr('src', 'video/non_morte/'+ randomInt(1, 12) +'.mp4');
  })

  // SET TIMER
  if (deathHover) {
    timer += 1/30;
    $('#current').text('current: ' + current + "*");
  } else {
    if (timer > 0) {timer -= 1/120}
    $('#current').text('current: ' + current);
  }
  $('#timer').text('timer: ' + timer.toFixed(1));

  // FILTER ARRAY
  arr = jQuery.grep(arr, function(a) {
    return (a!==death);
  });
  rnd = arr[Math.floor(Math.random() * arr.length)];

  // CHANGE VIDEO
  if (timer > 5) {
    if (deathHover) {
      change = $('#video' + rnd);
      change.attr('src', 'video/morte/'+ randomInt(1, 6) +'.mp4').addClass('death');
      death = parseInt(change.attr('number'));
    }
    timer = 0;
  }

}, 1000/30);

// STATES
$('#state2, #state3, #state4').hide();
var state = 1;
var fadeTime = 500;

function expTime() {
  setTimeout(endExp, 1000*60*5);
}

function startIntro() {
  state = 2;
  $('#intro').get(0).play();
  $('#state3, #state4').hide();
  $('#state1').fadeOut(fadeTime, function() {
    $('#state2').fadeIn(fadeTime, function() {
      $('body').css('background-color', '#000');
    })
  })
}
function startExp() {
  state = 3;
  expTime();
  for (var i = 0; i < 6; i++) {$('.video').get(i).currentTime = 0}
  $('#state1, #state4').hide();
  $('#state2').fadeOut(fadeTime, function() {
    $('#state3').fadeIn(fadeTime, function() {
      $('body').css('background-color', '#000');
    })
  })
}
function endExp() {
  state = 4;
  $('#outro').get(0).play();
  $('#state1, #state2').hide();
  $('#state3').fadeOut(fadeTime, function() {
    $('#state4').fadeIn(fadeTime, function() {
      $('body').css('background-color', '#fff');
    })
  })
}
function endOutro() {
  state = 1;
  resetVideos();
  $('#state2, #state3').hide();
  $('#state4').fadeOut(fadeTime, function() {
    $('#state1').fadeIn(fadeTime);
  })
}

// ENTER
$(document).keypress(function(e) {
  if(e.which==13 && state==1) {
    startIntro();
  }
})

// RANDOM INTEGER BETWEEN MIN AND MAX
function randomInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// POINTER FOLLOW
$(document).bind('mousemove', function(e){
   $('#point').css({
     top: e.pageY - $("#point").height()/2,
     left: e.pageX - $("#point").width()/2 
   });
 });
