<?php
require_once "bootstrap.php";
global $dbh;

if (isset($_POST["comment"]) && isset($_POST["post"])) {
    $comment = $_POST["comment"];
    $post = $_POST["post"];
    $dbh->addComment($comment, $post);
}
$data = json_decode(file_get_contents("php://input"), true);
if (isset($data["title"]) && isset($data["content"])) {
    $title = $data["title"];
    $content = $data["content"];
    $dbh->addPost($title, $content);
}
if (isset($data["rating"]) && isset($data["post"])) {
    $rating = $data["rating"];
    $post = $data["post"];
    $dbh->addRating($rating, $post);
}
?>
