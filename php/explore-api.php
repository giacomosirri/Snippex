<?php
require_once "bootstrap.php";
global $dbh;

if (isset($_GET["keyword"])) {
    $keyword = $_GET["keyword"];
    $json_data = $dbh->getPostsFromKeyword($keyword);
    header("Content-Type: application/json");
    echo json_encode($json_data);
} elseif (isset($_SESSION["LoggedUser"])) {
    $user = $_SESSION["LoggedUser"];
    $json_data = $dbh->getExplorePosts($user);
    header("Content-Type: application/json");
    echo json_encode($json_data);
} else {
    throw new Error("Something went wrong!");
}

