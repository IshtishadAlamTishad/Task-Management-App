<?php
session_start();
require_once('../../model/db.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $conn = getConnection();
    if (!$conn) {
        die("Database connection failed!");
    }

    $taskName = mysqli_real_escape_string($conn, $_POST['taskName']);
    $taskDesc = mysqli_real_escape_string($conn, $_POST['taskDesc']);
    $taskLabel = mysqli_real_escape_string($conn, $_POST['taskLabel']);
    $taskCategory = mysqli_real_escape_string($conn, $_POST['taskCategory']);
    $startTime = mysqli_real_escape_string($conn, $_POST['startTime']);
    $endTime = mysqli_real_escape_string($conn, $_POST['endTime']);
     
    if (isset($_FILES["detailedTaskFile"]) && $_FILES["detailedTaskFile"]["error"] === UPLOAD_ERR_OK) {
        $targetDir = "../asset/upload/taskFiles/";
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        $fileName = time() . "_" . basename($_FILES["detailedTaskFile"]["name"]);
        $targetFilePath = $targetDir . $fileName;
        $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));
        $allowed = ["pdf", "docx", "txt"];

        if (in_array($fileType, $allowed)) {
            if (move_uploaded_file($_FILES["detailedTaskFile"]["tmp_name"], $targetFilePath)) {
                $userId = $_SESSION['user_id'] ?? null;
                if (!$userId) {
                    echo "<script>alert('User not logged in.');</script>";
                    exit;
                }
                $sql = "INSERT INTO taskinfos (ID, taskName, taskDesc, taskLabel, taskCategory, startTime, endTime, taskFile)
                        VALUES ('$userId', '$taskName', '$taskDesc', '$taskLabel', '$taskCategory', '$startTime', '$endTime', '$targetFilePath')";
                if (mysqli_query($conn, $sql)) {
                    $_SESSION['success'] = "Task added successfully.";
                    header("Location: ".$_SERVER['PHP_SELF']);
                    exit;
                } else {
                    echo "Database error: " . mysqli_error($conn);
                }
            } else {
                echo "<script>alert('File upload failed.');</script>";
                exit;
            }
        } else {
            echo "<script>alert('Invalid file type. Only PDF, DOCX & TXT allowed!');</script>";
            exit;
        }
    }
    else {
        echo "<script>alert('No file selected or upload error!');</script>";
        exit;
    }
    mysqli_close($conn);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $taskName = $_POST['taskName'];
    $taskDesc = $_POST['taskDesc'];
    $taskLabel = $_POST['taskLabel'];
    $taskCategory = $_POST['taskCategory'];
    $startTime = $_POST['startTime'];
    $endTime = $_POST['endTime'];
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
    if (empty($startTime)) {
        $errors[] = "Error: Start time cannot be empty.";
    }
    if (empty($endTime)) {
        $errors[] = "Error: End time cannot be empty.";
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

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Create Task</title>
    <link rel="stylesheet" href="../../asset/css/taskcreation.css" />
    <link rel="icon" type="image/png" href="../../asset/imgs/icon.png">
</head>
<body>
    <div class="task-container">
        <header>
            <h1>Create a Task</h1>
        </header>

        <div class="quick-add">
            <input type="text" id="quickTaskInput" placeholder="Type task name..." />
            <button onclick="quickAddTask()">Quick Add</button>
            <button onclick="toggleAdvanced()">+</button>
            <button onclick="toggleCategoryManager()">Categories</button>
        </div>

        <div class="advanced-form" id="advancedForm">
            <h2>Detailed Task Form</h2>
            <form id="taskForm" method="post" action="" enctype="multipart/form-data">
                <input type="text" name="taskName" placeholder="Task Name" required />
                <textarea name="taskDesc" placeholder="Task Description"></textarea>
                <input type="text" name="taskLabel" placeholder="Labels (comma separated)"/>
                <select name="taskCategory">
                    <option value="">Select Category</option>
                    <option value="development">Development</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                </select>
                <label for="startTime">Start Time:</label>
                <input type="datetime-local" name="startTime" placeholder="Start Time" />
                <label for="endTime">End Time:</label>
                <input type="datetime-local" name="endTime" placeholder="End Time"/>
                <label for="detailedTaskFile">Upload File:</label>
                <input type="file" name="detailedTaskFile" class="file-input"/>
                <button type="submit">Add Task</button>
            </form>
        </div>

        <div class="category-manager" id="categoryManager">
            <h2>Category Manager</h2>
            <div class="quick-add">
                <input type="text" id="newCategoryInput" placeholder="New category name..." />
                <button onclick="addCategory()">Add</button>
            </div>
            <ul id="categoryList"></ul>
        </div>

        <div class="task-lists" id="taskLists"></div>

        <div id="toast" class="toast">Toast message here</div>
    </div>

    <script src="../../asset/js/taskcreation.js"></script>
</body>
</html>

