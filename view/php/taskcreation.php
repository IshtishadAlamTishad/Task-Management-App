<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $taskName = $_POST['taskName'];
    $taskDesc = $_POST['taskDesc'];
    $taskLabel = $_POST['taskLabel'];
    $taskCategory = $_POST['taskCategory'];
    $taskFile = $_FILES['detailedTaskFile'];

    $errors = [];

    if (preg_match('/\d/', $taskName)) {
        $errors[] = "Error: Task name cannot contain numbers.";
    }

    if (empty($taskDesc)) {
        $errors[] = "Error: Task description cannot be empty.";
    }

    if (empty($taskCategory)) {
        $errors[] = "Error: Please select a task category.";
    }

    if ($taskFile['error'] == UPLOAD_ERR_NO_FILE) {
        $errors[] = "Error: Please upload a file.";
    }

    if (!empty($errors)) {
        foreach ($errors as $error) {
            echo $error . "<br>";
        }
    } else {
        echo "Task added successfully!";
    }
}
?>
