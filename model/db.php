<?php


    $dbHost = "localhost";
    $dbUser = "root";
    $dbPassword = "";
    $dbName = "TaskManagementDatabase";

    $conn = mysqli_connect($dbHost,$dbUser,$dbPassword,$dbName);

    function getConnection() {
        global $dbName;
        global $dbPassword;
        global $dbUser;

        $conn = mysqli_connect($GLOBALS['dbHost'],$dbUser,$dbPassword,$dbName);

        return $conn;
    }
?>