<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $db_server = "localhost";
    $db_user = "root";
    $db_password = "";
    $db_name = "TaskManagementDatabase";

    $conn = mysqli_connect($db_server, $db_user, $db_password, $db_name);

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $conn = mysqli_connect($db_server, $db_user, $db_password, $db_name);

    $first = mysqli_real_escape_string($conn, $_POST['firstname']);
    $last = mysqli_real_escape_string($conn, $_POST['lastname']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn,$_POST['password']);
    $phone = mysqli_real_escape_string($conn, $_POST['phone']);
    $dob = mysqli_real_escape_string($conn, $_POST['dob']);
    $gender = mysqli_real_escape_string($conn, $_POST['gender']);
    $address = mysqli_real_escape_string($conn, $_POST['address']);

    if (isset($_FILES["profile_image"]) && $_FILES["profile_image"]["error"] === UPLOAD_ERR_OK) {
        $targetDir = "../../imgs/";
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0755, true);
        }

        $fileName = time() . "_" . basename($_FILES["profile_image"]["name"]);
        $targetFilePath = $targetDir . $fileName;
        $imageFileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));
        $allowed = ["jpg", "jpeg", "png", "gif"];

        if (in_array($imageFileType, $allowed)) {
            if (move_uploaded_file($_FILES["profile_image"]["tmp_name"], $targetFilePath)) {
                $relativePath = "uploads/" . $fileName;

                $sql = "INSERT INTO userinfo (firstname,lastname,email,password,phone,dob,gender,address,selfImage)
                    VALUES ('$first','$last','$email','$password','$phone','$dob','$gender','$address','$imagePath')";
                if (mysqli_query($conn, $sql)) {
                    echo "<script>alert('Saved to database successfully!'); window.location.href='../view/html/loginPage.html';</script>";
                } else {
                    echo "Database error: " . mysqli_error($conn);
                }
            } else {
                echo "<script>alert('Submit failed'); </script>";
            }
        } else {
            echo "<script>alert('Invalid image type. Only JPG, PNG, JPEG, and GIF are allowed');</script>";
        }
    } else {
        echo "<script>alert('No image file selected or upload error.');</script>";
    }

    mysqli_close($conn);
}
?>
