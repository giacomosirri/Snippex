<?php
require_once "session-check.php";
$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/comments.js");
$templateParams["user"] = $_SESSION["LoggedUser"];
$templateParams["title"] = "Comments";
$templateParams["page"] = "../template/comments.html";

require "./base.php";