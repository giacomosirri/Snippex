<?php
require_once "bootstrap.php";
global $dbh, $error;

if (isset($_GET["PostID"])) {
    $post = $_GET["PostID"];
    $json_data = $dbh->verifyRating($post);
    header("Content-Type: application/json");
    echo json_encode($json_data);
} else {
    throw new $error;
}
?>
