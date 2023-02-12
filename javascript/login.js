window.onload = () => {
    setUpModal();
    let loginTab =  document.getElementById("login-tab");
    let registrationTab = document.getElementById("registration-tab");
    loginTab.addEventListener("click", () => activeLogin(loginTab));
    registrationTab.addEventListener("click", () => activeLogin(registrationTab));
    activeLogin(loginTab);
    const form = document.getElementById("formLogin");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        console.log([...formData]);
        axios.post("../php/login-api.php", formData)
            .then(x => window.location.replace("../php/feed.php"))
            .catch(x => {
                let errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
                document.getElementById("error-message").innerText = "Invalid username or password";
                errorModal.show();
            });
    });
}

function activeLogin(link) {
    const links = document.querySelectorAll("nav .nav-link");
    links.forEach(item => item.classList.remove("active"));
    links.forEach(item => item.style.fontWeight = "normal");
    link.classList.add("active");
    link.style.fontWeight = "bold";
}

