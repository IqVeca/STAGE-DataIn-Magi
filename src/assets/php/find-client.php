<?php
  header('Content-type: text/javascript');

  $conn = mysqli_connect("localhost","root","","my_db");

  if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
  }
  $json =  array(
    'name' => "",
    'age' => 0,
    'issue' => "",
    'number' => "",
    'address' => "" 
    );

  $sql = "SELECT * FROM `users`";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      if($row['name'] == $_POST['value']){
          $json['name'] = $row['name'];
          $json['age'] = $row['age'];
          $json['issue'] = $row['issue'];
          $json['number'] = $row['number'];
          $json['address'] = $row['address'];
          echo json_encode($json);
          $conn->close();
          return;
      }
    }
  } else {
    echo "0 results";
  }
  $conn->close();

  echo json_encode($json);

?>
