<?php
require_once "bootstrap.php";
global $dbh;
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $user = $_GET["Username"];
    $json_data = $dbh->getUserFriends($user);
    header("Content-Type: application/json");
    echo json_encode($json_data);
} elseif ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $dbh->addFriendshipRequest($data["User1"], $data["User2"]);
} else {
    throw new Error("Something went wrong!");
}
?>