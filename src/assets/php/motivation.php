<?php
$conn = mysqli_connect("localhost","root","","my_db");

if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$primary_key = rand(0,2000);   
$motivation = array_key_exists( 'motivation' , $_POST ) ? $_POST['motivation'] : '' ;
$start_data = array_key_exists( 'start_data' , $_POST ) ? $_POST['start_data'] : '' ;
$end_data = array_key_exists( 'end_data' , $_POST ) ? $_POST['end_data'] : '' ;

$query = " INSERT INTO `sickness_reports` VALUES ('$primary_key', '$motivation', STR_TO_DATE('$start_data','%d/%m/%Y %r'), STR_TO_DATE('$end_data', '%d/%m/%Y %r')); ";
mysqli_query($conn, $query);
header("location: ../../app-sickness-reports.html");


?>
