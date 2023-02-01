<?php
require_once "bootstrap.php";
global $dbh;
if (isset($_GET["PostID"])) {
    $post = $_GET["PostID"];
    $json_data["comments"] = $dbh->getPostComments($post);
    $json_data["post"] = $dbh->getPost($post);
    header("Content-Type: application/json");
    echo json_encode($json_data);
} else {
    throw new Error("Something went wrong!");
}
