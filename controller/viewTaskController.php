<?php
header("Content-Type: application/json");
require_once('../model/db.php');

$conn = getConnection();

if (!$conn) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

$sql = "SELECT taskName, taskCategory, startTime, endTime FROM taskinfos";
$result = $conn->query($sql);

$tasks = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }
}

echo json_encode($tasks);
$conn->close();
?>
