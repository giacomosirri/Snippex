<?php
require_once "bootstrap.php";
$dbh = new DatabaseHelper("localhost", "root", "", "snippex", 3306);

$user_data = $dbh->getUserData("jaaack");
header("Content-Type: application/json");
echo json_encode($user_data);
?>
