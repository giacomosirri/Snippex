<?php
require_once "bootstrap.php";

$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "../javascript/login.js");
$templateParams["page"] = "../template/login.html";
require "./base.php";
?>