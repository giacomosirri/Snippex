<?php
require_once "bootstrap.php";
global $dbh;

if(isset($_POST["comment"]) && isset($_POST["post"])) {
    $comment = $_POST["comment"];
    $post = $_POST["post"];
    $dbh->addComment($comment, $post);
}