import { createNewPost } from "./commons.js";

const url_string = window.location.href;
const url = new URL(url_string);
const user = url.searchParams.get("Username");

axios.get('../php/posthistory-api.php', {params: {Username: user}}).then(response => {
    const section = document.getElementById("all-posts");
    const h1 = document.querySelector("header h1");
    h1.innerHTML = user + "'s post history";
    for (let i=0; i<response.data.length; i++) {
        section.appendChild(createNewPost(response.data[i], i));
    }
});