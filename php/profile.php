<?php
require_once "bootstrap.php";

$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/userprofile.js");
if (isset($_GET["Username"])) {
    $templateParams["user"] = $_GET["Username"];
} else {
    throw new Error("Something went wrong!");
}
$templateParams["title"] = "Your profile";
$templateParams["page"] = "../template/profile.html";

require "./base.php";
?>