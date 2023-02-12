<?php
session_start();
require_once "../database/database.php";

$dbh = new DatabaseHelper("localhost", "root", "", "snippex", 3306);
// 'error' represents the common error object thrown by the server when it cannot process the client's request.
// All requests are prone to be wrong, so the API server files must check all the incoming variables.
// The only variable that is always assumed to be set is the session variable containing the logged-in-user username,
// because if it was not initialized the requested page would not load and the login/register page would load instead.
// This particular behavior is considered fundamental for the correct operation of this website.
// See the session-check.php file for better understanding.
$error = new Error("Server cannot process the request. Please go back and try again.");
?>