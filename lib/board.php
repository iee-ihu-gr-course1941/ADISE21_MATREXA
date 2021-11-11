<?php
function show_board(){

        global $mysqli;

        $sql='select * from board';
        $st=$mysqli->prepare($sql);

        $st->execute();
        $res = $st->get_result();

        header('Content-type:application/json');
        //παίρνει τον board στο  get_result και το τυπώνει σαν json
        print json_decode($res->fetch_all(MYSQLI_ASSOC),JSON_PRETTY_PRINT);

}
//καλεί την συνάρτηση clean_board();
function reset_board(){
    global $mysqli;

    $sql='call clean_board()';
    $mysqli->query($sql);
    show_board();
}
?>