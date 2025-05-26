<?php
session_start();
error_reporting(E_ALL);

require_once('../model/userModel.php');

function validateEmail($email) {
    $email = trim($email);
    if ($email === "") {
        return "Email is required";
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return "Invalid email format";
    }
    return null;
}

function validatePassword($password) {
    $password = trim($password);
    if ($password === "") {
        return "Password is required";
    }
    if (strlen($password) < 8) {
        return "Password must be at least 8 characters";
    }
    return null;
}

function authUser($email, $password) {
    $user = getUserByEmail($email); 
    if (!$user) {
        header("Location: ../view/html/loginPage.html?message=" . urlencode("User doesn't exist"));
        exit;
    }

    // Use password_verify to check hashed password
    if (!password_verify($password, $user['password'])) {
        header("Location: ../view/html/loginPage.html?message=" . urlencode("Invalid password"));
        exit;
    }

    // Set session variables
    $_SESSION['status'] = true;
    $_SESSION['userID'] = $user['id'];
    $_SESSION['email'] = $email;

    $role = getUserRoleById($user['id']);
    if (!$role) {
        echo "Exception error: Role not found";
        exit;
    }

    $_SESSION['role'] = $role;
    $_SESSION['name'] = $user['firstname'] . ' ' . $user['lastname'];
    $_SESSION['profile_img'] = !empty($user['selfImage']) ? $user['selfImage'] : 'asset/imgs/defaultImgs.png';

    setcookie('status', 'true', time() + 3000, '/');

    if ($role === 'Admin') {
        header("Location: ../view/php/adminMenu.php");
    } elseif ($role === 'User') {
        header("Location: ../view/php/userMenu.php");
    } else {
        echo "Exception error: Unknown role '$role'";
    }
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');

    $emailError = validateEmail($email);
    $passwordError = validatePassword($password);

    if ($emailError || $passwordError) {
        $_SESSION['login_error'] = trim(($emailError ?? '') . ' ' . ($passwordError ?? ''));
        header("Location: ../view/html/loginPage.html");
        exit;
    }

    authUser($email, $password);
} else {
    header("Location: ../view/html/loginPage.html?message=" . urlencode("Unauthorized access"));
    exit;
}
?>
