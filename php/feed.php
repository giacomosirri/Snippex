<?php
require_once "bootstrap.php";

$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/feed.js", "../javascript/image.js");
if (isset($_GET["Username"])) {
    $templateParams["user"] = $_GET["Username"];
    $templateParams["title"] = "Feed";
} else {
    throw new Error("Something went wrong!");
}
$templateParams["page"] = "../template/feed.html";

require "./base.php";
?>