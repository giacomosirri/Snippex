<?php
require_once "bootstrap.php";
global $dbh;

function checkFriendship($friend_matrix, $user, $logic): bool {
    foreach ($friend_matrix as $group):
        foreach ($group as $friend):
            if ($friend['Username'] == $user) {
                return $logic;
            }
        endforeach;
    endforeach;
    return !$logic;
}

// A user 'A' cannot request a friendship to a user 'B' if they are already friend,
// or if they 'A' has already sent a requested to 'B' or vice versa
function isFriendshipRequestAcceptable($db, $user): bool {
    $unavailable = array();
    $unavailable[] = $db->getUserCurrentFriendship($user);
    $unavailable[] = $db->getUserSentRequestsOfFriendships($user);
    $unavailable[] = $db->getUserIncomingRequestsOfFriendship($user);
    return checkFriendship($unavailable, $user, false);
}

function isFriendshipRequestManagementAcceptable($db, $user): bool {
    $available = array();
    $available[] = $db->getUserIncomingRequestsOfFriendship($user);
    return checkFriendship($available, $user, true);
}

function isFriendshipTerminationAcceptable($db, $user): bool {
    $available = array();
    $available[] = $db->getUserCurrentFriendship($user);
    return checkFriendship($available, $user, true);
}

// All operations that change friendship status are critical, because inconsistencies may come up.
// Therefore, controls are needed before the submission of new friendship requests, acceptances, rejections and terminations.
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
    if ($type == "request" && isFriendshipRequestAcceptable($dbh, $data["Requesting"])) {
        $dbh->addFriendshipRequest($data["Requesting"], $data["Requested"]);
    } elseif ($type == "acceptance" && isFriendshipRequestManagementAcceptable($dbh, $data["User"])) {
        $dbh->addFriendshipAcceptance($data["ID"]);
    } elseif ($type == "rejection" && isFriendshipRequestManagementAcceptable($dbh, $data["User"])) {
        $dbh->deleteFriendship($data["ID"]);
    } elseif ($type == "termination" && isFriendshipTerminationAcceptable($dbh, $data["User"])) {
        $dbh->terminateFriendship($data["ID"]);
    }
    else {
        throw new Error("Incorrect call.");
    }
} else {
    throw new Error("Something went wrong!");
}
?>
