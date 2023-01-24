const url_string = window.location.href;
const url = new URL(url_string);
const user = url.searchParams.get("Username");

axios.get('../php/image-api.php', {params: {Username: user}}).then(response => {
    document.getElementById("profile-pic").src = "../profile_pics/" + response.data[0]['ProfilePic'];
});