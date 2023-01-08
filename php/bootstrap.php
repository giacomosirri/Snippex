<?php
session_start();
require_once("database/database.php");
$dbh = new DatabaseHelper("mysqli", "root", "", "snippex", 3306);
?>
