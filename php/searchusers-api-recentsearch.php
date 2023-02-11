<?php
require_once "bootstrap.php";
global $dbh;

$username = "";
if (isset($_GET["Username"])) {
    $username = $_GET["Username"];
}
if (!isset($_SESSION["RecentSearch"])) {
    $_SESSION["RecentSearch"] = array();
}
if ($username != "") {
    $_SESSION["RecentSearch"][] = $username;
    $_SESSION["RecentSearch"] = array_unique($_SESSION["RecentSearch"]);

}
echo json_encode($_SESSION["RecentSearch"]);
?>
