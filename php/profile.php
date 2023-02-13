<?php
require_once "session-check.php";
$templateParams["js"] = array("../javascript/profile.js", "../javascript/userprofile.js");
$templateParams["title"] = "Your profile";
$templateParams["page"] = "../template/profile.html";

require "./base.php";
?>