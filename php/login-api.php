<?php
require_once "bootstrap.php";
global $dbh;
echo $_POST["username"];
if (isset($_POST["username"]) && isset($_POST["password"])) {
    $user = $_POST["username"];
    $password = $_POST["password"];
} else {
    throw new Error("Something went wrong!");
}
?>