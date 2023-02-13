<?php
require_once "session-check.php";
$templateParams["js"] = array("../javascript/feed.js");
$templateParams["user"] = $_SESSION["LoggedUser"];
$templateParams["title"] = "Feed";
$templateParams["page"] = "../template/feed.html";

require "./base.php";
?>