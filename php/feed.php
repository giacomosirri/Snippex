<?php
require_once "bootstrap.php";

if (isset($_GET["Username"])) {
    $templateParams["user"] = $_GET["Username"];
    $templateParams["title"] = "Feed";
} else {
    throw new Error("Something went wrong!");
}
$templateParams["page"] = "../template/feed.html";

require "./base.php";
?>