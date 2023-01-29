<?php
require_once "bootstrap.php";
global $dbh;
if (isset($_SESSION["LoggedUser"])) {
    $user = $_GET["Username"];
    $json_data["user-data"] = $dbh->getUserData($user);
    $json_data["most-voted-post"] = $dbh->getMostVotedPostOfUser($user);
    $json_data["rating-stats"] = $dbh->getUserRatingStats($user);
    $json_data["categories"] = $dbh->getCategories();
    $json_data["friends"] = $dbh->getUserFriends($user);
    header("Content-Type: application/json");
    echo json_encode($json_data);
} else {
    throw new Error("Something went wrong!");
}
?>
