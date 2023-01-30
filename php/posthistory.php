<?php
require_once "session.php";
$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/posthistory.js", "../javascript/image.js");
if (isset($_GET["Username"])) {
    $templateParams["user"] = $_GET["Username"];
    $templateParams["title"] = $templateParams["user"]."'s post history";
} else {
    throw new Error("Something went wrong!");
}
$templateParams["page"] = "../template/posthistory.html";

require "./base.php";
?>
