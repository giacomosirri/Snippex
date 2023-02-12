<?php
require_once "bootstrap.php";
global $dbh, $error;

if (isset($_GET["Username"])) {
    $searchedUser = $_GET["Username"];
    $user = $dbh->getUserFromInitials($searchedUser);
    header("Content-Type: application/json");
    echo json_encode($user);
} else {
    throw new $error;
}
?>
