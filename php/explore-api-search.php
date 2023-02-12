<?php
require_once "bootstrap.php";
global $dbh, $error;

if (isset($_GET["keyword"])) {
    $keyword = $_GET["keyword"];
    if (isset($_GET["username"])) {
        $json_data = $dbh->getPostsFromKeywordAndUser($keyword, $_GET["username"]);
    } else {
        $json_data = $dbh->getPostsFromKeyword($keyword);
    }
    header("Content-Type: application/json");
    echo json_encode($json_data);
} else {
    throw new $error;
}
?>
