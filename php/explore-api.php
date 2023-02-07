<?php
require_once "bootstrap.php";
global $dbh;

$user = $_SESSION["LoggedUser"];
$json_data = $dbh->getExplorePosts($user);
header("Content-Type: application/json");
echo json_encode($json_data);
?>
