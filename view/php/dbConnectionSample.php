<?php

 $db_server = "localhost";
 $db_user = "root";
 $db_password = "";
 $db_name = "TaskManagementDatabase";
 $conn = "";

 $conn = mysqli_connect($db_server,$db_user,$db_password,$db_name);


 if($conn) {
    echo "Connected!";
 } else {
    echo "Not connected!";
 }

 for($i=0;$i<3;$i++) {
   echo "hello World";
 }

?>