var me={};
var game_status={};
var id_pioniou={};
var board={};
var thesi={};
$(function () {
  draw_board_with_pieces();
  draw_empty_board();
  fill_board();
  fill_main_board();
  game_status_update();
  board_status_update();
 // $('#move_div').hide();
  //$('#board').hide();
  //$('#pawn_to_play').hide(1000);
	$('#quarto_login').click( login_to_game);
  $('#reset').click( reset_game);
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
    for (var j = 0; j < 8; j++) {
      t += '<td onclick="select_piece_to_play('+j+')" class="quarto_square_" id="square_' + j + '">' + j + '</td>';
    }
    t += '</tr>'
  }
  for (var i = 0; i < 1; i++) {
    t += '<tr>';
    for (var j = 8; j < 16; j++) {
      t += '<td onclick="select_piece_to_play('+j+')" class="quarto_square_" id="square_' + j + '">' + j + '</td>';
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
      t += '<td  class="quarto_square" id="square_' + i + '_' + j + '"></td>';
    }//onclick="place_piece_to_board('+i+j+')"
    t += '</tr>';
  }
  t += '</table>';
  $('#board').html(t);
  $('.quarto_square').click(click_on_piece);
}
//thelw me auth thn function na pernaw sto adeio pinaka ta db toy board
function fill_main_board(){
  $.ajax({url: "quatro.php/board/", 
  headers: {"X-Token": me.token},
    success: fill_board_by_data });
}

function fill_board_by_data(data){
    board=data;
    for(var i=0;i<data.length;i++) {
    var o = board[i];
		var id = '#square_'+ o.x +'_' + o.y;
    var c = (o.id != null) ? o.id : '';
    var im = (o.id != null) ? '<img id="' + c + '" class="piece" src="images/' + c + '.jpg" >' : '';
    $(id).html(im);
    }
}

//auto to function gemizei ton pinaka twn pioniwn
function fill_board() {
  $.ajax({
    url: "quatro.php/pieces",
    type: "GET",
    dataType: "json",
    success: function(data){
      for (var i = 0; i <data.length; i++) {
        var o = data[i];
        var id = '#square_' + o.id;
        var $k=id;
        var c = (o.id != null) ? o.id : '';
        var im = (o.id != null) ? '<img id="' + c + '" class="piece" src="images/' + c + '.jpg" >' : '';
        $(id).html(im);
      }
    }
  });
  $.ajax({
    url: "quatro.php/board",
    type: "GET",
    dataType: "json",
    success: draw_empty_board
  });
}
  
  function login_to_game() {
    if($('#username').val()=='') {
      alert('You have to set a username');
      return;
    }
    var p_player = $('#PLAYER').val();
    var p_username=$('#username').val();
    fill_board();
    
    $.ajax({url: "quatro.php/players/"+p_player, 
        method: 'PUT',
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify( {username:p_username, player_id: p_player}),
        success: login_result,
        error: login_error});
  }

  function login_result(data) {
    me = data[0];
    $('#game_initializer').hide();
    update_info();
    game_status_update();
    
    
  }

  function login_error(data,y,z,c) {
    var x = data.responseJSON;
    alert(x.errormesg);
  }
  
  function update_info(){
    $('#game_info').html("I am Player: "+me.player_id+", my name is "+me.username +'<br>Token='+me.token+'<br>Game state: '+game_status.status+', '+ game_status.p_turn+' must play now.');
    
  } 

  function game_status_update() {
    $.ajax({url: "quatro.php/status/", success: update_status,headers: {"X-Token": me.token} });
    //thelw na kanw ena rwquest kai gia na diavazw to board kai na to ananewnw 
  }
  //rwtaei ton server pio einai to status 
  function update_status(data) {
    game_status=data[0];
    update_info();
    if(game_status.p_turn==me.player_id &&  me.player_id!=null) {
      x=0;
      // do play
     // $('#move_div').show(1000);
     // $('#board').show(1000);
      //$('#pawn_to_play').hide(1000);

      setTimeout(function() { game_status_update();}, 15000);
    } else {
      // must wait for something
      //$('#move_div').hide(1000);
      //$('#board').show(1000);
      //$('#pawn_to_play').show(1000);
      setTimeout(function() { game_status_update();}, 4000);
    }
     
  }
  function board_status_update() {
    $.ajax({url: "quatro.php/board/", success: update_board,headers: {"X-Token": me.token} });
    
  }
  function update_board(data){
    board_status=data;
    fill_main_board();
    move_result();
    if(game_status.p_turn==me.player_id &&  me.player_id!=null) {
      x=0;
      setTimeout(function() { board_status_update();}, 15000);
    } else {
      setTimeout(function() { board_status_update();}, 4000);
    }
  }

 function select_piece_to_play(square_id){
    
   id_pioniou = square_id;
   
    $.ajax({url: "quatro.php/board/piece/"+square_id, 
			method: 'PUT',
			dataType: "json",
			contentType: 'application/json',
			data: JSON.stringify({id:square_id}),
			success: move_result,
			error: login_error});
    
  }


function move_result(){
  $.ajax({
    url: "quatro.php/board/piece/",
    dataType: 'json',
    success:function(data){
      var o=data[0];
      console.log(o);
      var square="square_" +o.id;
    document.getElementById(square).style.visibility="hidden"; // kruvw to img me to pou ginei onclick
      var im = '<img id="' + o.id + '" class="piece" src="images/' + o.id + '.jpg" >';
      $('#piece').html(im);
    }
  });

  
}

//me to onclick sto board pernw to teleutaio pioni gia na to topothetisw sto id poy clickara

//prepei o kwdikas na mpei sto function p ftianei to board
function place_piece_to_board(i){
  var number = i,
    output = [],
    sNumber = number.toString();

for (var i = 0, len = sNumber.length; i < len; i += 1) {
    output.push(+sNumber.charAt(i)); //pernw to id twn pioniwn kai thelw na to spasw mesa se ena array gia na exw kai tis dio times x,y
}

  $.ajax({
    url: "quatro.php/board/piece/",
    type: "GET",
    dataType: "json",
    success:function(data){
      draw_empty_board(data);
    }
  });
}

function click_on_piece(e) {
	var o=e.target;
	if(o.tagName!='TD') {o=o.parentNode;}
	if(o.tagName!='TD') {return;}
	
	var id=o.id;
	var a=id.split(/_/);
	$('#chosen_piece').val(a[1]+' ' +a[2]);
	update_moves_selector();
}

function update_moves_selector(){
  var s = $('#chosen_piece').val();
	var a = s.trim().split(/[ ]+/);
  thesi=a;
	if(a.length!=2) {
		return;
	}
  $.ajax({
    url: "quatro.php/board/piece/",
    type: "GET",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success:move_selector,
    error: login_error
  });
}

function move_selector(data){
  x=thesi[0];
  y=thesi[1];
  var o=data[0];
  console.log(o.id);
  var id = '#square_'+ x+'_'+y; 
  var c = (o.id != null) ? o.id : '';
  var im = (o.id != null) ? '<img id="' + c + '" class="piece" src="images/' + c + '.jpg" >' : '';
  $(id).html(im);
  //ena put request gia na gemizw to board
  $.ajax({url: "quatro.php/board/inboard/"+c, 
  method: 'PUT',
  dataType: "json",
  contentType: 'application/json',
  data: JSON.stringify({x:x,y:y}),
  });
}

function reset_game(){
  try {
		$.ajax({
			url: "quatro.php/board/",
			method: "POST",
			success: (function () { location.reload(); }),
			headers: { "X-Token": me.token }
		});
	} catch (exception) {
		location.reload();
	}
}
