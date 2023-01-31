<?php
require_once "session-check.php";
$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/feed.js", "../javascript/image.js");
$templateParams["user"] = $_SESSION["LoggedUser"];
$templateParams["title"] = "Feed";
$templateParams["page"] = "../template/feed.html";

require "./base.php";
?>