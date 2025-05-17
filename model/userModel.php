<?php
    error_reporting(E_ALL);
    require_once('db.php');

    function login($user){
        $con = getConnection();
        $sql = "select * from userinfo where email='{$user['username']}' and password='{$user['password']}'";
        $result = mysqli_query($con, $sql);
        $count = mysqli_num_rows($result);

        if($count == 1){
            return true;
        } else {
            return false;
        }
    }

    function getUserById($id){
        $con = getConnection();
        $sql = "select * from userinfo where username='{$id['username']}' and password='{$id['password']}'";
        $result = mysqli_query($con, $sql);
        return mysqli_fetch_assoc($result);
    }

    //function addUser() {}

    //function deleteUser() {}
?>
