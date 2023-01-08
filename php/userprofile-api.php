<?php
require_once "bootstrap.php";
$dbh = new DatabaseHelper("mysqli", "root", "", "snippex", 3306);

$user_data = $dbh->getUserData("jaaack");
echo json_encode($user_data);
?>
