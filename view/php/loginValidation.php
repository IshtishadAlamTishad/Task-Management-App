<?php 

    /*
    $name = "Mohammed Istishad Alam Tishad";
    $age = 24;
    $cgpa = 3.77;

    $a = array(1,3.77,"Tishad");

    //$a[2];

    $a = [
        [1,1,'A'],
        [2,1,'B'],
        [3,1,'C']
    ];

    //$a[2][2];

    $b = ['id'=> 1 , 'cgpa'=>3.77,'name'=>'Tishad'];
    
    $asArray = [
        $a1 = ['id'=>1,'cgpa'=>3.8,'name'=>'Ishtishad'],
        $a1 = ['id'=>2,'cgpa'=>3.9,'name'=>'cde'],
        $a1 = ['id'=>3,'cgpa'=>4,'name'=>'abc']
    ];

    //$asArray['a1']['id'];

    //echo "hello";

    */

    if(isset($_POST['submit'])) {
        $username = trim($_POST['email']);
        $password = trim($_POST['password']);
        $sz = strlen($password);

        if($username == "" || $password == "") {
            echo "null username/password!";
        } else if($username == $password) {
            echo "valid user";
            header("Location: profile.html");
            exit();
        } else if($sz <= 8) {
            echo "Password length must be more than 8!";
        } else {
            echo "Invalid user!";
        }
    } else {
        echo "Invalid request!";
    }

?>