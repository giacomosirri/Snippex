<?php
require_once "bootstrap.php";
global $dbh;

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $user = $_SESSION["LoggedUser"];
    $json_data = $dbh->getFavoritePosts($user);
    header("Content-Type: application/json");
    echo json_encode($json_data);
}

$data = json_decode(file_get_contents("php://input"), true);
if (isset($data["star"])) {
    $post = $data["post"];
    $dbh->addStar($post);
}
if (isset($data["unstar"])) {
    $post = $data["post"];
    $dbh->removeStar($post);
}

?>
