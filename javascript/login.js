document.getElementById("nav-home-tab").addEventListener("click", () => activeLogin(this));
document.getElementById("nav-profile-tab").addEventListener("click", () => activeLogin(this));

function activeLogin(link) {
    const links = document.querySelectorAll("nav .nav-link");
    links.forEach(item => item.classList.remove("active"));
    links.forEach(item => item.style.fontWeight="normal");
    link.classList.add("active");
    link.style.fontWeight="bold";
}