<?php
require_once "bootstrap.php";
global $dbh;
$user = $_SESSION["LoggedUser"];
$json_data["comments"] = $dbh->getNotificationsOfComments($user);
$json_data["ratings"] = $dbh->getNotificationsOfRatings($user);
$json_data["friendships"] = $dbh->getNotificationsOfFriendships($user);
header("Content-Type: application/json");
echo json_encode($json_data);
?>