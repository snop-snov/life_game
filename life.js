N = 100

world = []
dead = "dead"
life = "life"

function initWorld() {
  for(var i = 0; i < N; ++i ) {
    world.push([])
    for(var j = 0; j < N; ++j) {
      world[i].push(false)
    }
  }
}

function initWorldLayout() {
  var table = '';
  table += '<table>'

  for(var i = 0; i < N; ++i ) {
    table += '<tr>'
    for(var j = 0; j < N; ++j) {
      table += '<td id="' + i + '_' + j + '" class="' + dead + '"></td>'
    }
    table += '</tr>'
  }

  table += '</table>'

  $('#content').html(table);
}

function renderWorld() {
  for(var i = 0; i < N; ++i ) {
    for(var j = 0; j < N; ++j) {
      var elem_id = '#' + i + '_' + j
      var elem = $(elem_id)
      if(world[i][j])
        elem.removeClass(dead).addClass(life)
      else
        elem.removeClass(life).addClass(dead)
    }
  }
}

$(document).ready(function() {

  initWorld();
  initWorldLayout();

  for(;;) {
    setTimeout(1000)

    for(var i = 0; i < N; ++i ) {
      for(var j = 0; j < N; ++j) {
        var around = []

        if(i < N && j < N)
          arount.push(world[i+1][j+1])

        if(j < N)
          arount.push(world[i][j+1])

        if(i < N)
          arount.push(world[i+1][j])

        if(i > 0 && j < N)
          arount.push(world[i-1][j+1])

        if(i < N && j > 0)
          arount.push(world[i+1][j-1])

        if(i < N && j < N)
          arount.push(world[i-1][j-1])

        if(i > 0)
          arount.push(world[i-1][j])

        if(j > 0)
          arount.push(world[i][j-1])

        var count = 0
        for(var k = 0; k < around.lenght; ++k) {
          count += (around ? 1 : 0)
        }

        if(count == 3)
          world[i][j] = true
        else if((count < 2) || (count > 3))
          world[i][j] = false
      }
    }

  }

})