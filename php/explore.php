<?php
require_once "session-check.php";
$templateParams["js"] = array("../javascript/explore.js");
$templateParams["user"] = $_SESSION["LoggedUser"];
$templateParams["title"] = "Explore";
$templateParams["page"] = "../template/explore.html";

require "./base.php";
?>