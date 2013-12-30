N = 100

world = []

function initWorld() {
  for(var i = 0; i < N; ++i ) {
    world.push([])
    for(var j = 0; j < N; ++j) {
      world[i].push(0)
    }
  }
}

function initWorldLayout() {
  var table = '';
  table += '<table>'

  for(var i = 0; i < N; ++i ) {
    table += '<tr>'
    for(var j = 0; j < N; ++j) {
      table += '<td id="' + i + '_' + j + '" class="dead""></td>'
    }
    table += '</tr>'
  }

  table += '</table>'

  $('#content').html(table);
}

function renderWorld() {
  for(var i = 0; i < N; ++i ) {
    for(var j = 0; j < N; ++j) {
      var
    }
  }
}

$(document).ready(function() {

  initWorld();
  initWorldLayout();



})