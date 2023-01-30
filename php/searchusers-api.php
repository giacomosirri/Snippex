<?php
require_once "bootstrap.php";
global $dbh;

$user = $_SESSION["LoggedUser"];
$searchedUser = $_GET["Username"];
$friendship = $dbh->checkFriendship($user, $searchedUser);

if (count($friendship) > 0) {
    echo json_encode("amici");
} else {
    echo json_encode("non amici");
}


?>