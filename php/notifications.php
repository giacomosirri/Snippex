<?php
require_once "session-check.php";
$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/notifications.js", "../javascript/image.js");
$templateParams["title"] = "Your notifications";
$templateParams["page"] = "../template/notifications.html";
require "./base.php";
?>
