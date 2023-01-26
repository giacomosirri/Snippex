<?php
session_start();
$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/userprofile.js", "../javascript/image.js");
if (isset($_GET["Username"])) {
    $templateParams["user"] = $_SESSION["LoggedUser"];
    $templateParams["title"] = $templateParams["user"]."'s profile";
} else {
    throw new Error("Something went wrong!");
}
$templateParams["page"] = "../template/userprofile.html";

require "./base.php";
?>