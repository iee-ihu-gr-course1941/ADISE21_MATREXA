$(function () {
  draw_board_with_pieces();
  draw_empty_board();
  fill_board();
  create_board_by_data();
  fill_board_by_data();


});
function generate_table() {

  // get the reference for the body
  document.getElementById('btn').style.visibility = 'hidden';
}
//takes the json file from the url 

function draw_board_with_pieces() {
  var t = '<table id="quarto_table">';
  for (var i = 0; i < 1; i++) {
    t += '<tr>';
    for (var j = 1; j < 17; j++) {
      t += '<td class="quarto_square" id="square_' + j + '">' + j + '</td>';
    }
    t += '</tr>'
  }
  t += '</table>';
  $('#quarto_board').html(t);
}
function draw_empty_board() {
  var t = '<table id="board_table">';
  for (var i = 1; i < 5; i++) {
    t += '<tr>';
    for (var j = 1; j < 5; j++) {
      t += '<td class="guarto_square" id="square' + i + '_' + j + '">' + i + ',' + j + '</td>';
    }
    t += '</tr>';
  }
  t += '</table>';
  $('#board').html(t);
}

function fill_board() {
  $.ajax({
    url: "quatro.php/pieces",
    type: "GET",
    dataType: "json",
    success: fill_board_by_data
  });
  $.ajax({
    url: "quatro.php/board",
    type: "GET",
    dataType: "json",
    success: create_board_by_data
  });
}
function create_board_by_data(data) {
  for (var i = 0; i < 16; i++) {
    var o = data[i];
    var id = '#square' + o.x + '_' + o.y;
    $(id).html(id);
  }
}
function fill_board_by_data(data) {

  for (var i = 0; i < 16; i++) {
    var o = data[i];
    var id = '#square_' + o.id;
    var c = (o.id != null) ? o.id : '';
    var im = (o.id != null) ? '<img class="piece" src="images/' + c + '.jpg">' : '';
    $(id).html(im);
  }

}



