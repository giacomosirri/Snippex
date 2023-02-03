<?php
require_once "bootstrap.php";
global $dbh;
$username = $_POST["username"];
$password = $_POST["password"];
$passwordConfirm = $_POST["passwordConfirm"];
$name = $_POST["name"];
$surname = $_POST["surname"];
$dateOfBirth = $_POST["dateBirth"];
$signup_date = date("Y-m-d");

if($password != $passwordConfirm) {
    throw new Error("Passwords do not match!");
}
var_dump(password_hash($password, PASSWORD_DEFAULT));
if(count($dbh->getUserData($username)) == 0){
    $dbh->registerUser($name, $surname, $username, $dateOfBirth, password_hash($password, PASSWORD_DEFAULT), $signup_date);
    $_SESSION["LoggedUser"] = $username;
    header("Location: ./feed.php?Username=$username");
    exit;
} else {
    throw new Error("Username already exists. Please choose another one.");
}
?>