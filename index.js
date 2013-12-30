var rows = 100;
var cols = 100;

var world = [];
var death = 'death';
var life = 'life';

$(document).ready(function(){
  console.log("init");
  initContent();
  initWorld();
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
      world[i][j] = true;
      $("#" + i + "-" + j).addClass('death');
    }
  }
}



