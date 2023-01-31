<?php
require_once "session-check.php";
$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/userprofile.js", "../javascript/image.js");
$templateParams["title"] = "Your profile";
$templateParams["page"] = "../template/profile.html";
require "./base.php";
?>