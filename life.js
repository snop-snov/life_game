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

  world[71][32] = true
  world[72][33] = true
  world[73][31] = true
  world[73][32] = true
  world[73][33] = true

  world[46][42] = true
  world[46][43] = true
  world[45][42] = true
  world[45][43] = true
  world[44][52] = true
  world[45][52] = true
  world[46][52] = true
  world[43][53] = true
  world[47][53] = true
  world[42][54] = true
  world[48][54] = true
  world[42][55] = true
  world[48][55] = true
  world[45][56] = true
  world[43][57] = true
  world[47][57] = true
  world[44][58] = true
  world[45][58] = true
  world[46][58] = true
  world[45][59] = true
  world[46][62] = true
  world[47][62] = true
  world[48][62] = true
  world[46][63] = true
  world[47][63] = true
  world[48][63] = true
  world[45][64] = true
  world[49][64] = true
  world[44][66] = true
  world[45][66] = true
  world[49][66] = true
  world[50][66] = true
  world[47][76] = true
  world[48][76] = true
  world[47][77] = true
  world[48][77] = true
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
