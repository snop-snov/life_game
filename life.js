N = 100

dead = "dead"
life = "life"

world = []

function initWorld() {
  for(var i = 0; i < N; ++i) {
    world.push([])
    for(var j = 0; j < N; ++j) {
      world[i].push(false)
    }
  }
  world[51][52] = true
  world[52][53] = true
  world[53][51] = true
  world[53][52] = true
  world[53][53] = true

  world[6][2]   = true
  world[6][3]   = true
  world[5][2]   = true
  world[5][3]   = true
  world[4][12]  = true
  world[5][12]  = true
  world[6][12]  = true
  world[3][13]  = true
  world[7][13]  = true
  world[2][14]  = true
  world[8][14]  = true
  world[2][15]  = true
  world[8][15]  = true
  world[5][16]  = true
  world[3][17]  = true
  world[7][17]  = true
  world[4][18]  = true
  world[5][18]  = true
  world[6][18]  = true
  world[5][19]  = true
  world[6][22]  = true
  world[7][22]  = true
  world[8][22]  = true
  world[6][23]  = true
  world[7][23]  = true
  world[8][23]  = true
  world[5][24]  = true
  world[9][24]  = true
  world[4][26]  = true
  world[5][26]  = true
  world[9][26]  = true
  world[10][26] = true
  world[7][36]  = true
  world[8][36]  = true
  world[7][37]  = true
  world[8][37]  = true
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
