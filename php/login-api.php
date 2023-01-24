<?php
require_once "bootstrap.php";
global $dbh;
if (isset($_POST["username"]) && isset($_POST["password"])) {
    $user = $_POST["username"];
    $password = $_POST["password"];
    $json_data["login"] = $dbh->login($user, $password);
    header("Content-Type: application/json");
    echo json_encode($json_data);
} else {
    throw new Error("Something went wrong!");
}
?>