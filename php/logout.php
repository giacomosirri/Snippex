<?php
session_start();
if (isset($_SESSION["LoggedUser"])) {
    unset($_SESSION["LoggedUser"]);
}
if(isset($_SESSION["RecentSearch"])){
    unset($_SESSION["RecentSearch"]);
}
header("Location: ../template/login.html");
exit();
?>
