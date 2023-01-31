<?php
require_once "bootstrap.php";
global $dbh;
// the client asks for the logged user's notifications
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $user = $_SESSION["LoggedUser"];
    $json_data["comments"] = $dbh->getNotificationsOfComments($user);
    $json_data["ratings"] = $dbh->getNotificationsOfRatings($user);
    $json_data["friendships"] = $dbh->getNotificationsOfFriendships($user);
    header("Content-Type: application/json");
    echo json_encode($json_data);
}
// the client marks a specific notification as read
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    parse_str(file_get_contents("php://input"),$notificationID);
    $dbh->markNotificationAsRead($notificationID);
}
?>