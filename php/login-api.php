<?php
require_once "bootstrap.php";
global $dbh;
if (isset($_POST["username"]) && isset($_POST["password"])) {
    $user = $_POST["username"];
    $password = $_POST["password"];
    if (count($dbh->checkLogin($user, $password)) != 0) {
        $_SESSION["LoggedUser"] = $user;
        header("Location: ./feed.php?Username=$user");
        exit;
    } else {
        throw new Error("Username or password are incorrect. Please check again.");
    }
} else {
    throw new Error("Something went wrong!");
}
?>