<?php
require_once "bootstrap.php";
global $dbh;
$json_data["user-data"] = $dbh->getUserData("jaaack");
$json_data["most-voted-post"] = $dbh->getMostVotedPostOfUser("jaaack");
$json_data["rating-stats"] = $dbh->getUserRatingStats("jaaack");
header("Content-Type: application/json");
echo json_encode($json_data);
?>
