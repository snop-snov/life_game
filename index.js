var rows = 100;
var cols = 100;

var world = [];
var death = 'death';
var life = 'life';
var tmr_id = 0;

$(document).ready(function(){
  reset();
  set_event_handlers();
});

function stopInterval(){
  clearInterval(tmr_id);
}

function set_event_handlers() {
  $('#set_size_btn').on('click', function() {
    rows = parseInt($('#rows').val());
    cols = parseInt($('#cols').val());
    reset();
  });

  $('#play').on('click', function() {
    stopInterval();
    tmr_id = setInterval(life_step, 200);
  });

  $('#stop').on('click', function() {
    stopInterval();
  });

  $('#step').on('click', function() {
    stopInterval();
    life_step();
  });

  $('#content td').on('click', function() {
    cell = $(this);
    row_col_arr = cell.attr('id').split('-');
    row = parseInt(row_col_arr[0]);
    col = parseInt(row_col_arr[1]);

    is_life = world[row][col];
    world[row][col] = !is_life;
    if (is_life) {
      cell.removeClass(life).addClass(death);
    } else {
      cell.removeClass(death).addClass(life);
    }
  });
}

function reset(){
  world = [];
  initContent();
  initWorld(world);

  world[5][5] = true;
  world[6][6] = true;
  world[7][6] = true;
  world[7][5] = true;
  world[7][4] = true;

  initWorldState();
}

function initContent(){
  var table = $("#content");
  table.html('');
  for (var i = 0; i < rows; ++i) {
    var tr = "<tr>";
    for (var j = 0; j < cols; ++j){
      tr += "<td id='" + i + "-" + j + "'></td>";
    }
    tr += "</tr>";
    table.append(tr);
  }
}

function initWorld(arr) {
  for (var i = 0; i < rows; ++i) {
    arr.push([]);
    for (var j = 0; j < cols; ++j){
      arr[i][j] = false;
    }
  }

}

function initWorldState(){
  for (var i = 0; i < rows; ++i) {
    for (var j = 0; j < cols; ++j){
      if (world[i][j])
        $("#" + i + "-" + j).removeClass(death).addClass(life);
      else
        $("#" + i + "-" + j).removeClass(life).addClass(death);
    }
  }
}

function check(row,col,new_world){
  var lifeCount = 0;
  for (var i = row-1; i <= row+1; ++i) {
    for (var j = col-1; j <= col+1; ++j){
      if(!(i==row && j==col)){
        var tmp_i = lineLoop(i, rows);
        var tmp_j = lineLoop(j, cols);

        if(world[tmp_i][tmp_j])
          ++lifeCount;
      }
    }
  }
  if (lifeCount == 3) {
    new_world[row][col] = true;
  }

  if (lifeCount < 2 || lifeCount > 3) {
    new_world[row][col] = false;
  }
}

function lineLoop(x, len){
  if(x < 0)
    return (len - 1);
  if(x > len - 1)
    return 0;
  return x;
}

function life_step(){
  new_world = [];
  initWorld(new_world);
  for (var i = 0; i < rows; ++i) {
    for (var j = 0; j < cols; ++j){
      new_world[i][j] = world[i][j];
      check(i, j, new_world);
    }
  }
  world = new_world;

  initWorldState();
}
