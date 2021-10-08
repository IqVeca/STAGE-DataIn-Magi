<?php
  header('Content-type: text/javascript');

  $conn = mysqli_connect("localhost","root","","my_db");

  if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
  }

  $dati = array();
  $json =   array(
    'name' => "",
    'age' => 0,
    'issue' => "",
    'number' => "",
    'address' => "" 
    );

  $sql = "SELECT * FROM `users`";
  $result = $conn->query($sql);

  $cont = 0;
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      $json['name'] = $row['name'];
      $json['age'] = $row['age'];
      $json['issue'] = $row['issue'];
      $json['number'] = $row['number'];
      $json['address'] = $row['address'];

      $dati[$cont]= $json;
      $cont ++;
    }
  } else {
    echo "0 results";
  }
  $conn->close();

  echo json_encode($dati);

?>
