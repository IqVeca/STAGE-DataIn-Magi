<?php
  header('Content-type: text/javascript');

  $conn = mysqli_connect("localhost","root","","my_db");

  if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
  }
  else

  $cont = 0;
  $index = (int)$_POST['value'];

  $sql = "SELECT * FROM `users`";
  $result = $conn->query($sql);


  if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
          if($cont == $index){     
            $sql = "DELETE FROM `users` WHERE id = '" . $row['id'] . "'";
            $result = $conn->query($sql);
            return;
            }
          $cont++;
      }
  }
  $conn->close();

?>
