const default_pic = "../profile_pics/unknown-man.png";

axios.get('../php/image-api.php').then(response => document.getElementById("menu-profile-pic").src =
    "../profile_pics/" + (response.data[0]['ProfilePic'] ?? default_pic));