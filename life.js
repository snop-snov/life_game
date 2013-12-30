N = 100

world = []
dead = "dead"
life = "life"

function initWorld() {
  for(var i = 0; i < N; ++i) {
    world.push([])
    for(var j = 0; j < N; ++j) {
      world[i].push(false)
    }
  }
  world[1][2] = true
  world[2][3] = true
  world[3][1] = true
  world[3][2] = true
  world[3][3] = true
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

function lifeCycle(){
  var newWorld = []
  for(var i = 0; i < N; ++i ) {
    newWorld.push([])
    for(var j = 0; j < N; ++j) {
      var around = []

      if(i < N-1 && j < N-1)
        around.push(world[i+1][j+1])

      if(j < N-1)
        around.push(world[i][j+1])

      if(i < N-1)
        around.push(world[i+1][j])

      if(i > 0 && j < N-1)
        around.push(world[i-1][j+1])

      if(i < N-1 && j > 0)
        around.push(world[i+1][j-1])

      if(i > 0 && j > 0)
        around.push(world[i-1][j-1])

      if(i > 0)
        around.push(world[i-1][j])

      if(j > 0)
        around.push(world[i][j-1])

      var count = 0
      for(var k = 0; k < around.length; ++k) {
        count += (around[k] ? 1 : 0)
      }

      if(count == 3)
        newWorld[i].push(true)
      else if((count < 2) || (count > 3))
        newWorld[i].push(false)
      else
        newWorld[i].push(world[i][j])
    }
  }

  world = newWorld

  renderWorld();
  setTimeout(lifeCycle, 200)
}

$(document).ready(function() {
  initWorld();
  initWorldLayout();
  renderWorld();
  window.setTimeout(lifeCycle, 1000);
})
