<?php
  header('Content-type: text/javascript');

  $conn = mysqli_connect("localhost","root","","my_db");

  if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
  }
  $sql = "UPDATE `events` SET `status`=" . $_POST['value'] . ",`motiv_for_susp`='" . $_POST['motivation'] . "' WHERE `datetime` = '" . $_POST['date'] . "'";
  $result = $conn->query($sql);
  $conn->close();
?>