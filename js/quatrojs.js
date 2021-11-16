$(function(){
  draw_empty_pieces_table();
  fill_board();
});
function generate_table() {
    
    // get the reference for the body
    document.getElementById('btn').style.visibility='hidden';
    
    
    
    var body = document.getElementsByTagName("body")[0];
  
    // creates a <table> element and a <tbody> element
   
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
  
    // creating all cells
    for (var i = 1; i < 5; i++) {
      // creates a table row
      var row = document.createElement("tr");
  
      for (var j = 1; j < 5; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        var cellText = document.createTextNode(i+','+j);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
  
      // add the row to the end of the table body
      tblBody.appendChild(row);
    }
  
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "2");
  }
//takes the json file from the url 
function fill_board(){
    $.ajax({url:"quatro.php/board",succes:fill_board_by_data});
    $.ajax({url:"quatro.php/pieces",succes:draw_empty_pieces_table});
}
function fill_board_by_data(data){
    
}
//thelw na dimiourgisw enan pinaka me ola ta pionia
function draw_empty_pieces_table(){

  var body = document.getElementsByTagName("body")[0];
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  for(var i=1;i<17;i++){
    var cell=document.createElement("td");
    var im=i;
    var src='images/'+im+'.jpg';
    var cellText=document.createElement('img');
    cellText.src=src;
    cell.appendChild(cellText);
    tblBody.appendChild(cell);
  }

  
   // put the <tbody> in the <table>
   tbl.appendChild(tblBody);
   // appends <table> into <body>
   body.appendChild(tbl);
   // sets the border attribute of tbl to 2;
   tbl.setAttribute("border", "2");
}