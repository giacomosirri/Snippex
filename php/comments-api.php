<?php
require_once "bootstrap.php";
global $dbh;

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET["PostID"])) {
        $post = $_GET["PostID"];
        $json_data["comments"] = $dbh->getPostComments($post);
        $json_data["post"] = $dbh->getPost($post);
        header("Content-Type: application/json");
        echo json_encode($json_data);
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data["id"]) && $data["action"] == "delete") {
        var_dump($data);
        $id = $data["id"];
        $dbh->deleteComment($id);
    } elseif (isset($data["id"]) && $data["action"] == "edit") {
        $id = $data["id"];
        $text = $data["text"];
        $dbh->editComment($id, $text);
    }
} else {
    throw new Error("Something went wrong!");
}
