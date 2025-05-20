<?php

require_once 'db.php';

function login($user){
    $conn = getConnection();
    $sql = "SELECT id FROM userinfo WHERE email = '{$user['username']}' AND password = '{$user['password']}'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) === 1) {
        return mysqli_fetch_assoc($result);
    } else {
        return false;
    }
}


function getUserById($id){
    $conn = getConnection();
    $sql = "SELECT firstname, lastname, selfImage FROM userinfo WHERE id = '$id'";
    $result = mysqli_query($conn, $sql);

    if(mysqli_num_rows($result) === 1){
        return mysqli_fetch_assoc($result);
    } else {
        return false;
    }
}


function insertUser($user){
    $conn = getConnection();
    $checkEmail = "SELECT id FROM userinfo WHERE email = '{$user['email']}'";
    $result = mysqli_query($conn, $checkEmail);

    if(mysqli_num_rows($result) > 0){
        return false;
    }

    $sql = "INSERT INTO userinfo (
        firstname,
        lastname,
        email,
        password,
        phone,
        DOB,
        gender,
        address,
        selfImage
    ) VALUES (
        '{$user['firstname']}',
        '{$user['lastname']}',
        '{$user['email']}',
        '{$user['password']}',
        '{$user['phone']}',
        '{$user['DOB']}',
        '{$user['gender']}',
        '{$user['address']}',
        '{$user['selfImage']}'
    )";

    if(mysqli_query($conn, $sql)){
        return true;
    } else {
        return false;
    }
}


function updateUser($user){
    $conn = getConnection();
    $sql = "UPDATE userinfo SET
        firstname = '{$user['firstname']}',
        lastname = '{$user['lastname']}',
        phone = '{$user['phone']}',
        DOB = '{$user['DOB']}',
        gender = '{$user['gender']}',
        address = '{$user['address']}'
    WHERE email = '{$user['email']}'";

    if(mysqli_query($conn, $sql)){
        return true;
    } else {
        return false;
    }
}

function updateAvatar($user){
    $conn = getConnection();
    $sql = "UPDATE userinfo SET selfImage = '{$user['selfImage']}' WHERE email = '{$user['email']}'";

    if(mysqli_query($conn, $sql)){
        return true;
    } else {
        return false;
    }
}

function updatePassword($user){
    $conn = getConnection();
    $sql = "UPDATE userinfo SET password = '{$user['password']}' WHERE email = '{$user['email']}'";

    if(mysqli_query($conn, $sql)){
        return true;
    } else {
        return false;
    }
}
?>
