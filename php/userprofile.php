<?php
require_once "session-check.php";
$templateParams["js"] = array("../javascript/userprofile.js");
if (isset($_GET["Username"])) {
    $templateParams["title"] = $_GET["Username"]."'s profile";
} else {
    throw new Error("You have to specify the user whose profile you want to look at.");
}
$templateParams["page"] = "../template/userprofile.html";
require "./base.php";
?>