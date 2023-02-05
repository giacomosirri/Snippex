<?php
require_once "session-check.php";
$templateParams["js"] = array("../javascript/posthistory.js");
if (isset($_GET["Username"])) {
    $templateParams["user"] = $_GET["Username"];
    $templateParams["title"] = $templateParams["user"]."'s post history";
} else {
    throw new Error("Something went wrong!");
}
$templateParams["page"] = "../template/posthistory.html";

require "./base.php";
?>
