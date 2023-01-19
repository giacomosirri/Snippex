<?php
require_once "bootstrap.php";
global $dbh;
$json_data["user-data"] = $dbh->getUserData("jaaack");
$json_data["most-voted-post"] = $dbh->getMostVotedPostOfUser("topg");
$json_data["rating-stats"] = $dbh->getUserRatingStats("jaaack");
$json_data["categories"] = $dbh->getCategories();
$json_data["friends"] = $dbh->getUserFriends("jaaack");
header("Content-Type: application/json");
echo json_encode($json_data);
?>
