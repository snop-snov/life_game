var rows = 100;
var cols = 100;

var world = [];
var death = 'death';
var life = 'life';
var tmr_id = 0;

$(document).ready(function(){
  $('#set_size_btn').on('click', function() {
    rows = parseInt($('#rows').val());
    cols = parseInt($('#cols').val());
    reset();
  });

  $('#play').on('click', function() {
    tmr_id = setInterval(life_step, 200);
  });

  $('#stop').on('click', function() {
    clearInterval(tmr_id);
  });

  $('#step').on('click', function() {
    clearInterval(tmr_id);
    life_step();
  });
  reset();
});

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
        var tmp_i = i;
        var tmp_j = j;
        if(i < 0)
          tmp_i = rows - 1;
        if(j < 0)
          tmp_j = cols - 1;
        if(i > rows - 1)
          tmp_i = 0;
        if(j > cols - 1)
          tmp_j = 0;

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


