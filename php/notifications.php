<?php
$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/notifications.js", "../javascript/image.js");
if (isset($_GET["Username"])) {
    $templateParams["user"] = $_GET["Username"];
    $templateParams["title"] = "Your notifications";
} else {
    throw new Error("Something went wrong!");
}
$templateParams["page"] = "../template/notifications.html";

require "./base.php";
?>
