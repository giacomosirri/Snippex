<?php
require_once "bootstrap.php";
global $dbh;
if (isset($_GET["Username"]) && isset($_GET["Password"])) {
    $user = $_GET["Username"];
    $password = $_GET["Password"];
    $json_data["login"] = $dbh->login($user, $password);
    header("Content-Type: application/json");
    echo json_encode($json_data);
} else {
    throw new Error("Something went wrong!");
}
?>