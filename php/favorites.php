<?php
require_once "session-check.php";
$templateParams["js"] = array("../javascript/posthistory.js");
$templateParams["user"] = $_SESSION["LoggedUser"];
$templateParams["title"] = "Your favorites";
$templateParams["page"] = "../template/posthistory.html";

require "./base.php";
?>
