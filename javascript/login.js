window.onload = () => {
    document.getElementById("nav-home-tab").addEventListener("click", () => activeLogin(this));
    document.getElementById("nav-profile-tab").addEventListener("click", () => activeLogin(this));
    document.getElementById("formLogin").addEventListener("submit", () => checkForm());
}

function activeLogin(link) {
    const links = document.querySelectorAll("nav .nav-link");
    links.forEach(item => item.classList.remove("active"));
    links.forEach(item => item.style.fontWeight="normal");
    link.classList.add("active");
    link.style.fontWeight="bold";
}

function submitPrint(event){
    alert(event);
}

function checkForm() {
    let username = document.getElementById("usernameLogin").value;
    let password= document.getElementById("passwordLogin").value;
    axios.post("../php/login-api.php",  {username: username, password: password}).then(() => {}).catch(() => alert("Bad"));
}