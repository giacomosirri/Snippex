<?php
require_once "bootstrap.php";
global $dbh;
$user = $_GET["Username"] ?? $_SESSION["LoggedUser"];
$json_data = $dbh->getProfilePic($user);
header("Content-Type: application/json");
echo json_encode($json_data);
?>
