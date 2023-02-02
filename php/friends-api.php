<?php
require_once "bootstrap.php";
global $dbh;
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $user = $_GET["Username"];
    $json_data = $dbh->getUserFriends($user);
    header("Content-Type: application/json");
    echo json_encode($json_data);
} elseif ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    parse_str(file_get_contents("php://input"), $json_data);
    $users = json_decode($json_data, true);
    echo $users;
} else {
    throw new Error("Something went wrong!");
}
?>