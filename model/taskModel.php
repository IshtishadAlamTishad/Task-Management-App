<?php

require_once('db.php');

function getAllTasks($userId) {
    $conn = getConnection();
    $tasks = [];

    if (!$conn) return $tasks;

    $sql = "SELECT taskID, ID, taskName, taskDesc, startTime, endTime, taskLabel, taskCategory, taskFile, isDone FROM taskinfos WHERE ID = ?";
    $stmt = mysqli_prepare($conn, $sql);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "i", $userId); 
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if ($result && mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $row['isDone'] = (int)$row['isDone']; 
                $tasks[] = $row;
            }
        }
        mysqli_stmt_close($stmt);
    }

    mysqli_close($conn);
    return $tasks;
}

function updateTaskStatus($taskID, $isDone, $userID) {
    $conn = getConnection();
    if (!$conn) return false;

    $sql = "UPDATE taskinfos SET isDone = ? WHERE taskID = ? AND ID = ?";
    $stmt = mysqli_prepare($conn, $sql);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "iii", $isDone, $taskID, $userID); 
        $result = mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    } else {
        $result = false;
    }

    mysqli_close($conn);
    return $result;
}

?>