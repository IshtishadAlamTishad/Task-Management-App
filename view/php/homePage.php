<?php
session_start();
session_unset();
session_destroy();
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Home | TM</title>
        <link rel="stylesheet" href="../../asset/css/homePageStyle.css">
        <link rel="icon" type="image/png" href="../../asset/imgs/icon.png">
    </head>

    <body>
        <div class="navbar">
            <a href="../php/homePage.php">Home</a>
            <a href="../html/aboutUs.html" id="aboutUs">About Us</a>
            <a href="../html/contactUsPage.html">Contact Us</a>
            <a href="../html/loginPage.html" class="login">Login</a>
            <a href="../html/signupPage.html" class="signup">SignUP</a>
        </div>

        <div class="container">

            <h2 id="title">Task Management WebApp</h2>
            <i><p>Boosting productivity with simple and smart task management</p></i>
            <img src="../../asset/imgs/icon.png" alt="icon" id="iconImg">
            <hr>
            <div class="infoSec">
                <p id="loadMc"></p>
            </div>

        </div>

    <script src="../../asset/js/homePage.js"></script>
    
    </body>
</html>