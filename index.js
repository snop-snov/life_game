var rows = 100;
var cols = 100;

var world = [];
var death = 'death';
var life = 'life';

$(document).ready(function(){
  console.log("init");
  initContent();
  initWorld();
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

function initWorld() {
  for (var i = 0; i < rows; ++i) {
    world.push([]);
    for (var j = 0; j < cols; ++j){
      world[i][j] = false;
    }
  }
  world[50][50] = true;
  world[51][51] = true;
  world[52][51] = true;
  world[52][50] = true;
  world[52][49] = true;
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


