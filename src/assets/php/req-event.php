<?php
  
  $conn = mysqli_connect("localhost","root","","my_db");

  if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
  }


  $query = "SELECT * FROM `sickness_reports`;";
  
  $result = mysqli_query($conn,$query);
  $result_array = array();

  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($result_array, $row);
    }
  }
  echo json_encode($result_array);
?>