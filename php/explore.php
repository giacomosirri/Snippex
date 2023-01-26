<?php
session_start();
$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/explore.js", "../javascript/image.js");
if (isset($_SESSION["LoggedUser"])) {
    $templateParams["user"] = $_SESSION["LoggedUser"];
    $templateParams["title"] = "Explore";
} else {
    throw new Error("Something went wrong!");
}
$templateParams["page"] = "../template/explore.html";

require "./base.php";
?>
