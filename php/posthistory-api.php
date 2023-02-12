<?php
require_once "bootstrap.php";
global $dbh, $error;

if (isset($_GET["username"])) {
    $user = $_GET["username"];
    $json_data = $dbh->getAllPostsWrittenByUser($user);
    header("Content-Type: application/json");
    echo json_encode($json_data);
} else {
    throw new $error;
}
?>
