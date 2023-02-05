<?php
require_once "session-check.php";
$templateParams["js"] = array("../javascript/friends.js");
if (isset($_GET["Username"])) {
    $templateParams["user"] = $_GET["Username"];
    $templateParams["title"] = $templateParams["user"]."'s friends";
} else {
    throw new Error("Something went wrong!");
}
$templateParams["page"] = "../template/friends.html";

require "./base.php";
?>