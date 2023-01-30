<?php
require_once "session.php";
$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/userprofile.js", "../javascript/image.js");
$templateParams["user"] = $_SESSION["LoggedUser"];
$templateParams["title"] = "Your profile";
$templateParams["page"] = "../template/profile.html";

require "./base.php";
?>