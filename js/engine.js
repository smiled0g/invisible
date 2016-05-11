function pad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

var nProfiles = 2049;
var profilePermutes = [];
  for(var i=1; i<=nProfiles; i++) profilePermutes.push(pad(i,4));

var randomizeProfilePermutes = function() {
  profilePermutes.sort(function() {
    return .5 - Math.random();
  });
}

var highlightSelf = function() {
  $('.cell.self').addClass('highlight');
}

var initCanvasLevel = function(nLevel) {
  var height = $('.canvas').height(),
      width = $('.canvas').width();

  var level = levels[nLevel];

  $('.quote').html(level.q);
  $('.description').html(level.d);

  $('.canvas').empty();
  randomizeProfilePermutes();

  var selfPosition = getRandom(0, level.i*level.i-1);
  console.log(selfPosition);

  for(var i=0; i<level.i; i++) {
    var $column = $('<div class="row"></div>');
    for(var j=0; j<level.i; j++) {
      var img = i*level.i+j === selfPosition ? 'self.jpg' : profilePermutes[i*level.i+j];
      var selfClass = i*level.i+j === selfPosition ? 'self' : '';
      var $cell = $('<div class="cell '+selfClass+'"><img src="profiles/'+img+'"></div>')
      if(i*level.i+j === selfPosition) {
        $cell.click(function(){
          initCanvasLevel(nLevel+1);
        });
      }
      $column.append($cell);
    }
    $('.canvas').append($column);
  }

  if(level.t > 0) {
    $('.progress-bar').show();
    showTimeCountdown(level.t, highlightSelf);
  } else {
    $('.progress-bar').hide();
  }
}

var showTimeCountdown = function(duration, cb) {
  $( ".progress-bar-fill" ).stop(true, false).width('0%');
  $( ".progress-bar-fill" ).animate({
    width: '100%'
  }, duration, 'linear', cb);
}

var run = function() {
  $('.progress-bar').show();
  initCanvasLevel(0);
}
