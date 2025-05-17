<?php
    error_reporting(E_ALL);
    require_once('../model/userModel.php');
    session_start();

    if(isset($_POST['submit'])){
        $username = trim($_POST['email']);
        $password = trim($_POST['password']);

        if($username == "" || $password == ""){
            header("Location: ../../view/html/loginPage.html?message=" . urlencode("Email or password cannot be empty"));
            exit;
        }

        $user = ['username'=> $username, 'password'=>$password];
        $status = login($user);

        if($status){
            $_SESSION['status'] = true;
            $_SESSION['email'] = $username;
            setcookie('status', 'true', time() + 3000, '/');
            header('Location: ../view/php/userMenu.php');
            exit;
        } else {
            header("Location: ../view/html/loginPage.html?message=" . urlencode("Invalid credentials"));
            exit;
        }
    } else {
        header("Location: ../view/html/loginPage.html?message=" . urlencode("Unauthorized access"));
        exit;
    }
?>
