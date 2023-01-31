<?php
session_start();
if (!isset($_SESSION["LoggedUser"])) {
    header("Location: ../template/login.html");
    exit();
}
?>