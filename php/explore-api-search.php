<?php
require_once "bootstrap.php";
global $dbh;

if (isset($_GET["keyword"])) {
    $keyword = $_GET["keyword"];
    $json_data = $dbh->getPostsFromKeyword($keyword);
    header("Content-Type: application/json");
    echo json_encode($json_data);
}