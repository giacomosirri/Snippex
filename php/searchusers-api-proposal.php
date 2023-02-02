<?php
require_once "bootstrap.php";
global $dbh;
$searchedUser = $_GET["Username"];
$user = $dbh->getUserFromInitials($searchedUser);
echo json_encode($user);
?>