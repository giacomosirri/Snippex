<?php
require_once "bootstrap.php";
global $dbh;
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $user = $_GET["Username"];
    $json_data["current"] = $dbh->getUserCurrentFriendships($user);
    $json_data["requested"] = $dbh->getUserSentRequestsOfFriendships($user);
    $json_data["incoming"] = $dbh->getUserIncomingRequestsOfFriendship($user);
    $json_data["past"] = $dbh->getUserPastFriendships($user);
    header("Content-Type: application/json");
    echo json_encode($json_data);
} elseif ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $type = $data["Type"];
    if ($type == "request") {
        $dbh->addFriendshipRequest($data["User1"], $data["User2"]);
    } elseif ($type == "acceptance") {
        $dbh->addFriendshipAcceptance($data["ID"]);
    } elseif ($type == "rejection") {
        $dbh->deleteFriendship($data["ID"]);
    } else {
        throw new Error("Incorrect call.");
    }
} else {
    throw new Error("Something went wrong!");
}
?>