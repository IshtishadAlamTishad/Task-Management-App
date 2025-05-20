<?php
session_start();
error_reporting(E_ALL);


require_once('../model/userModel.php');

function validateEmail($email) {
    $email = trim($email);
    if($email === "") {
        return "Email is required";
    }
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return "Invalid email format";
    }
    return null;
}

function validatePassword($password) {
    $password = trim($password);
    if($password === "") {
        return "Password is required";
    }
    if(strlen($password) < 8) {
        return "Password must be at least 8 characters";
    }
    return null;
}

function authUser($email, $password, $role) {
    $userId = login(['username' => $email,'password' =>$password]);

    if ($userId) {
        $_SESSION['status'] = true;
        $_SESSION['user_id'] = $userId;
        $_SESSION['email'] = $email;
        $_SESSION['role'] = $role;

        $userData = getUserById($userId);
        if ($userData) {
            $_SESSION['name'] = $userData['firstname'] .' ' .$userData['lastname'];
            $_SESSION['profile_img'] = $userData['selfImage'] ?: 'asset/imgs/defaultImgs.png';
        }

        setcookie('status', 'true', time() + 3000, '/');

        if ($_SESSION['role'] === 'Admin') {
            header("Location: ../view/php/adminMenu.php");
        } else {
            header("Location: ../view/php/userMenu.php");
        }
        exit;
    } else {
        $_SESSION['login_error'] = "Invalid email or password";
        header("Location: ../view/html/loginPage.html");
        exit;
    }
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');
    $role = trim($_POST['role'] ?? '');
    $emailError = validateEmail($email);
    $passwordError = validatePassword($password);

    if ($emailError || $passwordError) {
        $_SESSION['login_error'] = ($emailError ?? '').' ' .($passwordError ?? '');
        header("Location: ../view/html/loginPage.html");
        exit;
    }

    authUser($email,$password,$role);

} else {
    header("Location: ../view/html/loginPage.html?message=" . urlencode("Unauthorized access"));
    exit;
}
