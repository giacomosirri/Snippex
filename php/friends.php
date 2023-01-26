<?php
$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/friends.js", "../javascript/image.js");
if (isset($_GET["Username"])) {
    $templateParams["user"] = $_GET["Username"];
    $templateParams["title"] = $templateParams["user"]."'s friends";
} else {
    throw new Error("Something went wrong!");
}
$templateParams["page"] = "../template/friends.html";

require "./base.php";
?>