<?php
require_once "bootstrap.php";

$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/posthistory.js");
if (isset($_GET["Username"])) {
    $templateParams["user"] = $_GET["Username"];
    $templateParams["title"] = $templateParams["user"]."'post history";
} else {
    throw new Error("Something went wrong!");
}
$templateParams["page"] = "../template/posthistory.html";

require "./base.php";
?>
