<?php
// Start the session at the very beginning of the PHP file
session_start();

// Initialize variables for message and its type
$message = '';
$message_type = ''; // Will be 'error' or 'success'

// Check if there's a message stored in the session from a previous redirect
if (isset($_SESSION['login_message'])) {
    $message = $_SESSION['login_message'];
    // Determine the message type (e.g., 'error' for failed login, 'success' for registration success)
    // Default to 'error' if type is not explicitly set
    $message_type = isset($_SESSION['message_type']) ? htmlspecialchars($_SESSION['message_type']) : 'error';

    // Clear the session variables immediately after retrieving them
    // This prevents the message from reappearing on subsequent page loads or refreshes
    unset($_SESSION['login_message']);
    unset($_SESSION['message_type']);
}

// Retain the email value if it was previously submitted and stored in the session
// This is crucial for user experience on login failure, so they don't have to re-type their email.
$retained_email = '';
if (isset($_SESSION['retained_email'])) {
    $retained_email = htmlspecialchars($_SESSION['retained_email']);
    unset($_SESSION['retained_email']); // Clear it after retrieving
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login | TM</title>
    <link rel="stylesheet" href="../../asset/css/loginPageStyle.css">
    <link rel="icon" type="image/png" href="../../asset/imgs/icon.png">
    </head>
<body>
    <div class="loginContainer">
        <form id="loginForm" method="post" action="../../controller/loginCheck.php">
            <center><img src="../../asset/imgs/icon.png" width="70px" alt="logo"></center>

            <h2 id="loginTitleTxt">Login</h2>

            <div class="inGrp">
                <label for="email">Email</label>
                <input type="email" id="email" name="email"
                       value="<?php echo $retained_email; ?>"
                       placeholder="yourEmail@gmail.com" required/>
            </div>

            <div class="inGrp">
                <label for="password">Password</label>
                <div class="password-wrapper">
                    <input type="password" id="password" name="password" value="" required/>
                    <span id="togglePassword">👁</span>
                </div>
            </div>

            <button type="submit" name="submit" value="submit">Login</button>

            <p class="message" id="message">
                <?php
                // Display the message if it exists, with its corresponding type class
                // The 'message' and 'message_type' variables are populated from $_SESSION at the top of the file
                if (!empty($message)) {
                    echo "<span class='" . $message_type . "'>" . $message . "</span>";
                }
                ?>
            </p>

            <div class="links">
                <a href="../php/forgotPasswordPage.php" target="_self">Forgot Password?</a><br>
                <a href="../html/signupPage.html">Don't have an account? Sign up</a>
            </div>

        </form>
    </div>

    <script src="../../asset/js/login.js"></script>
    </body>
</html>