<?php
require_once "bootstrap.php";
global $dbh;
if (isset($_GET["Username"])) {
    $user = $_GET["Username"];
    $json_data = $dbh->getFeedPosts($user);
    header("Content-Type: application/json");
    echo json_encode($json_data);
} else {
    throw new Error("Something went wrong!");
}

