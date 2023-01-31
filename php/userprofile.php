<?php
require_once "session-check.php";
$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/userprofile.js", "../javascript/image.js");
if (isset($_GET["Username"])) {
    $templateParams["title"] = $templateParams["user"]."'s profile";
} else {
    throw new Error("You have to specify the user whose profile you want to look at.");
}
$templateParams["page"] = "../template/userprofile.html";

require "./base.php";
?>