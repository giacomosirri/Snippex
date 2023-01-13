<?php
session_start();
require_once "../database/database.php";

$dbh = new DatabaseHelper("localhost", "root", "", "snippex", 3306);
?>