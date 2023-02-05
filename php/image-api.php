<?php
require_once "bootstrap.php";
global $dbh;
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user = $_GET["Username"];
    $json_data = $dbh->getProfilePic($user);
    header("Content-Type: application/json");
    echo json_encode($json_data);
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $user = $_SESSION["LoggedUser"];
    $data = json_decode(file_get_contents("php://input"), true);
    $encoded_image = $data["Image"];
    $format = explode(";", explode("/", $encoded_image)[1])[0];
    $encoded_image = str_replace(array('data:image/jpeg;base64,', 'data:image/jpg;base64,', 'data:image/png;base64,'),
        '', $encoded_image);
    $encoded_image = str_replace(' ', '+', $encoded_image);
    $decoded_image = base64_decode($encoded_image);
    $file = $user.'.'.$format;
    $path_file = '../profile_pics/'.$file;
    $source_img = imagecreatefromstring($decoded_image);
    $dbh->updateUserProfilePic($user, $file);
    $imageSave = imagejpeg($source_img, $path_file, 50);
    imagedestroy($source_img);
}
?>
