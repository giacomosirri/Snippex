<?php
require_once "bootstrap.php";
global $dbh;
$user = $_SESSION["LoggedUser"];
$searchedUser = $_GET["Username"];
$friendship = $dbh->getUserFriends($user);
$friendship_col = array_column($friendship, "Username");
if (in_array($searchedUser, $friendship_col)) {
    $json_data = "friend";
} else {
    $json_data = "not-friend";
}
?>