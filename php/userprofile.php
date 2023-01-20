<?php
require_once "bootstrap.php";
global $dbh;

$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/userprofile.js");
if (isset($_GET["Username"])) {
    $templateParams["user"] = $_GET["Username"];
    $templateParams["title"] = $templateParams["user"]."'s profile";
} else {
    throw new Error("Something went wrong!");
}
$templateParams["page"] = "../template/userprofile.template";

require "./base.php";
?>