<?php
require_once "bootstrap.php";
global $dbh;
// the client asks for the logged user's notifications
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $user = $_SESSION["LoggedUser"];
    $json_data["comments"] = $dbh->getNotificationsOfComments($user);
    $json_data["ratings"] = $dbh->getNotificationsOfRatings($user);
    $json_data["friendships"] = $dbh->getUserPotentialFriends($user);
    header("Content-Type: application/json");
    echo json_encode($json_data);
}
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $type = $data["Type"];
    if ($type === "update") {
        $dbh->markNotificationAsRead($data["ID"]);
    } else if ($type === "comment-addition") {
        $dbh->addNewCommentNotification($data["ID"], $data["Notified"]);
    } else if ($type === "rating-addition") {
        $dbh->addNewRatingNotification($data["ID"], $data["Notified"]);
    } else {
        throw new Error("Something went wrong!");
    }
}
?>