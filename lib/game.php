<?php
//παίρνει τον πίνακα game_status και τον εμφανίζει σε json μορφή
    function show_status(){
        global $mysqli;
        $sql='select * from game_status';
        $st = $mysql->prepare($sql);
        $st->execute();
        $res= $st ->get_result();
        header('Content-type:application/json');
        print json_encode($res->fetch_all(MYSQLI_ASSOC),JSON_PRETTY_PRINT);
    }
?>