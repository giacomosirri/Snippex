<?php
require_once "bootstrap.php";
global $dbh;

if (isset($_POST["comment"]) && isset($_POST["post"])) {
    $comment = $_POST["comment"];
    $post = $_POST["post"];
    $dbh->addComment($comment, $post);
}
$data = json_decode(file_get_contents("php://input"), true);
if (isset($data["title"]) && isset($data["content"]) && $data["action"] == "create") {
    $title = $data["title"];
    $content = $data["content"];
    $dbh->addPost($title, $content);
}
if (isset($data["rating"]) && $data["action"] == "addRating") {
    $rating = $data["rating"];
    $post = $data["post"];
    $dbh->addRating($rating, $post);
}
if (isset($data["rating"]) && $data["action"] == "changeRating") {
    $newRating = $data["rating"];
    $post = $data["post"];
    $dbh->changeRating($newRating, $post);
}
if (isset($data["id"]) && $data["action"] == "delete") {
    $id = $data["id"];
    $dbh->deletePost($id);
}
if (isset($data["id"]) && $data["action"] == "edit") {
    $id = $data["id"];
    $title = $data["title"];
    $content = $data["content"];
    $dbh->editPost($id, $title, $content);
}
?>
