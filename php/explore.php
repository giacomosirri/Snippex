<?php
require_once "session.php";
$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/explore.js", "../javascript/image.js");
$templateParams["user"] = $_SESSION["LoggedUser"];
$templateParams["title"] = "Explore";
$templateParams["page"] = "../template/explore.html";

require "./base.php";
?>
