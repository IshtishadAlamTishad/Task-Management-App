<?php

require_once('db.php');

function getAllTasks($userId) {
    $conn = getConnection();
    $tasks = [];

    if (!$conn) return $tasks;

    $userId = intval($userId); 

    $sql = "SELECT * FROM taskinfos WHERE ID = $userId";
    $result = mysqli_query($conn, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $tasks[] = $row;
        }
    }

    mysqli_close($conn);
    return $tasks;
}


function updateTaskStatus($taskID, $isDone, $userID) {
    $conn = getConnection();
    $taskID = (int)$taskID;
    $isDone = (int)$isDone;
    $userID = (int)$userID;

    $sql = "UPDATE taskinfos SET isDone = $isDone WHERE taskID = $taskID AND ID = $userID";
    $result = mysqli_query($conn, $sql);
    mysqli_close($conn);

    return $result;
}


?>
