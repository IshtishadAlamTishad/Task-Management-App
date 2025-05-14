<?php

$dbServer = "localhost";
$dbUser = "root";
$dbPassword = "";
$dbName = "TaskManagementDatabase";
$conn = mysqli_connect($dbServer,$dbUser,$dbPassword,$dbName);

if (!$conn) {
    die("Database connection failed.");
}

if (isset($_POST['submit'])) {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    $query = "SELECT * FROM `userinfo` WHERE email = '$email'";
    $result = mysqli_query($conn,$query);

    if ($result && mysqli_num_rows($result) === 1) {
        $row = mysqli_fetch_assoc($result);

        if ($password === $row['password']) {
            header("Location: ../view/html/userMenu.html");
            exit();
        } else {
            header("Location: ../view/html/loginPage.html?message=" . urlencode("Incorrect password."));
            exit();
        }
    } else {
        header("Location: ../view/html/loginPage.html?message=" . urlencode("No user found with this email."));
        exit();
    }
}

mysqli_close($conn);
?>
