<?php
require_once "bootstrap.php";
global $dbh;
if (isset($_SESSION["LoggedUser"])) {
    $user = $_SESSION["LoggedUser"];
    $json_data = $dbh->getExplorePosts($user);
    header("Content-Type: application/json");
    echo json_encode($json_data);
} else {
    throw new Error("Something went wrong!");
}

