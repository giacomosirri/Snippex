import { createNewPost } from "./commons.js";

const url_string = window.location.href;
const url = new URL(url_string);
const user = url.searchParams.get("Username");

axios.get('../php/posthistory-api.php', {params: {Username: user}}).then(response => {
    console.log(response.data[0]);
    const section = document.getElementById("all-posts");
    for (let i=0; i<response.data.length; i++) {
        section.appendChild(createNewPost(response.data[i]));
    }
});