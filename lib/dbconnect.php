<?php
$host='localhost';
$user='root';
$pass='';
$db='adise21_matrexa';
//require_once "config_local.php";

/*$con=mysqli_connect($host,$user,$pass,$db);
if($con)
    echo 'connected successfully to adise21_matrexa database';

//$user=$DB_USER;
//$pass=$DB_PASS;

*/
    $mysqli=new mysqli($host,$user,$pass,$db,null);

?>