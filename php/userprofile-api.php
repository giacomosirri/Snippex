<?php
require_once "bootstrap.php";
global $dbh;

$user_data = $dbh->getUserData("jaaack");
header("Content-Type: application/json");
echo json_encode($user_data);
?>
