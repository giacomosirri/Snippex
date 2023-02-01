<?php

require_once "bootstrap.php";
global $dbh;
$user = $_SESSION["LoggedUser"];
$searchedUser = $_GET["Username"];
$friends = $dbh->getUserFriends($user);
$friends_col = array_column($friends, "Username");
if (in_array($searchedUser, $friends_col)) {
    echo json_encode("friend");
} else {
    echo json_encode("not-friend");
}


?>