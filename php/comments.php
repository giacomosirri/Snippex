<?php
require_once "session.php";
$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/comments.js", "../javascript/image.js");
$templateParams["user"] = $_SESSION["LoggedUser"];
$templateParams["title"] = "Comments";
$templateParams["page"] = "../template/comments.html";

require "./base.php";