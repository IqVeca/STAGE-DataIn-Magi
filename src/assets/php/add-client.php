<?php

header('Content-type: text/javascript');

$conn = mysqli_connect("localhost","root","","my_db");

if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
  $name = array_key_exists( 'name' , $_POST ) ? $_POST['name'] : '' ;
  $age = array_key_exists( 'age' , $_POST ) ? $_POST['age'] : '' ;
  $issue = array_key_exists( 'healthIssues' , $_POST ) ? $_POST['healthIssues'] : '' ;
  $number = array_key_exists( 'phoneNumber' , $_POST ) ? $_POST['phoneNumber'] : '' ;
  $address = array_key_exists( 'address' , $_POST ) ? $_POST['address'] : '' ;


  $sql = "SELECT * FROM `users`";
  $result = $conn->query($sql);

  $query = "INSERT INTO `users` VALUES ('$name', $age, '$issue', '$number', '$address',$result->num_rows); ";
  mysqli_query($conn, $query);

  $conn->close();

?>