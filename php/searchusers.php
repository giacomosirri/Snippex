<?php
require_once "session-check.php";
$templateParams["js"] = array("../javascript/searchusers.js");
$templateParams["title"] = "Search users";
$templateParams["page"] = "../template/searchusers.html";

require "./base.php";
?>