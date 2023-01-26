<?php
session_start();
$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/userprofile.js", "../javascript/image.js");
if (isset($_SESSION["LoggedUser"])) {
    $templateParams["user"] = $_SESSION["LoggedUser"];
} else {
    throw new Error("Something went wrong!");
}
$templateParams["title"] = "Your profile";
$templateParams["page"] = "../template/profile.html";

require "./base.php";
?>