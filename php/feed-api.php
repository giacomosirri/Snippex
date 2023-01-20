<?php
require_once "bootstrap.php";
global $dbh;
if (isset($_GET["Username"])) {
    $user = $_GET["Username"];
    $json_data["user-data"] = $dbh->getUserData($user);
    $json_data["posts"] = $dbh->getFeedPosts($user);
    header("Content-Type: application/json");
    echo json_encode($json_data);
} else {
    throw new Error("Something went wrong!");
}
?>