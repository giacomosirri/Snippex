<?php
require_once "bootstrap.php";
global $dbh;
$json_data["user-data"] = $dbh->getUserData("jaaack");
$json_data["posts"] = $dbh->getFeedPosts("jaaack");
header("Content-Type: application/json");
echo json_encode($json_data);
?>