<?php
require_once "bootstrap.php";
global $dbh;

$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/userprofile.js");
if (isset($_GET["Username"])) {
    $templateParams["title"] = $_GET["Username"]."'s profile";
} else {
    $templateParams["title"] = "Generic title";
}

require "../html/userprofile.html";
?>