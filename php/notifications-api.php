<?php
require_once "bootstrap.php";
global $dbh;
// the client asks for the logged user's notifications
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $user = $_SESSION["LoggedUser"];
    $json_data["comments"] = $dbh->getNotificationsOfComments($user);
    $json_data["ratings"] = $dbh->getNotificationsOfRatings($user);
    $json_data["friendships"] = $dbh->getUserIncomingRequestsOfFriendship($user);
    header("Content-Type: application/json");
    echo json_encode($json_data);
}
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($data["ID"]) {
        $id = $data["ID"];
        $dbh->markNotificationAsRead($data["ID"]);
    } else {
        throw new Error("Something went wrong!");
    }
}
?>