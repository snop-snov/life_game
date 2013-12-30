var rows = 100;
var cols = 100;

var world = [];
var death = 'death';
var life = 'life';

$(document).ready(function(){
  console.log("init");
  initContent();
  initWorld(world);

  world[50][50] = true;
  world[51][51] = true;
  world[52][51] = true;
  world[52][50] = true;
  world[52][49] = true;

  initWorldState();
});

function initContent(){
  var table = $("#content");
  for (var i = 0; i < rows; ++i) {
    var tr = "<tr>";
    for (var j = 0; j < cols; ++j){
      tr += "<td id='" + i + "-" + j + "'></td>";
    }
    tr += "</tr>";
    console.log(tr);
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

function check(row,col){
  var lifeCount = 0;
  for (var i = row-1; i <= row+1; ++i) {
    for (var j = col-1; j <= col+1; ++j){
      if(i >= 0 && i < rows)
        if(j >= 0 && j < cols)
          if(i!=row && j!=col)
            if(world[i][j])
              ++lifeCount;
    }
  }
  if (lifeCount == 3)
    $("#" + row + "-" + col).removeClass(death).addClass(life);

  if (lifeCount < 2 && lifeCount > 3)
    $("#" + row + "-" + col).removeClass(life).addClass(death);

}

function life(){
  new_world = [];
  initWorld(new_world);
  for (var i = 0; i < rows; ++i) {
    for (var j = 0; j < cols; ++j){

    }
  }
}


