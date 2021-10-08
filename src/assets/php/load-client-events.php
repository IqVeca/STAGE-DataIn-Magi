<?php
  header('Content-type: text/javascript');

  $conn = mysqli_connect("localhost","root","","my_db");

  if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
  }
  $dati = array();
  $json =   array(
    'patient_id' => 0,
    'datetime' => "",
    'urgence' => 0,
    'details' => "",
    'status' => 0 ,
    'motiv_for_susp' => "",
    );

  $sql = "SELECT * FROM `users`";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        if( $_POST['user'] == $row['name']){
          $id = $row['id'];
          break;
        }
    }
  } else {
    echo "0 results";
  }


  $sql = "SELECT * FROM `events` WHERE patient_id = " . $id ;
  $result = $conn->query($sql);


  $cont = 0;
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $json['patient_id'] = $row['patient_id'];
        $json['datetime'] = $row['datetime'];
        $json['urgence'] = $row['urgence'];
        $json['details'] = $row['details'];
        $json['status'] = $row['status'];
        $json['motiv_for_susp'] = $row['motiv_for_susp'];
        $dati[$cont]= $json;
        $cont ++;
    }
  } else {
    echo "0 results";
  }

  $conn->close();
  echo json_encode($dati);

?>
