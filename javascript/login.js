const url_string = window.location.href;
const url = new URL(url_string);
const user = url.searchParams.get("Username");
const password = url.searchParams.get("Password");

axios.get('../php/login-api.php', {params: {Username: user, Password: password}}).then(response => {
    if (response.data.login.length > 0) {
        alert(response.data.login[0].Username + " has logged in!");
    } else {
        alert("Login failed!");
    }
});