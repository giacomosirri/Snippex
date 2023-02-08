<?php
require_once "bootstrap.php";
global $dbh;

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $user = $_SESSION["LoggedUser"];
    if (isset($_GET["keyword"])) {
        $keyword = $_GET["keyword"];
        $json_data = $dbh->getFavoritePostsWithKeyword($keyword, $user);
    } else {
        $json_data = $dbh->getFavoritePosts($user);
    }
    header("Content-Type: application/json");
    echo json_encode($json_data);
} else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data["star"])) {
        $post = $data["post"];
        $dbh->addStar($post);
    }
    if (isset($data["unstar"])) {
        $post = $data["post"];
        $dbh->removeStar($post);
    }
} else {
    throw new Error("Incorrect call.");
}
?>
