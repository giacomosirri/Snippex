import { createNewPost } from "./commons.js";

const url_string = window.location.href;
const url = new URL(url_string);
const user = url.searchParams.get("Username");
const explore = document.getElementById("explore-posts");

axios.get('../php/explore-api.php', {params: {Username: user}}).then(response => {
    for (let i=0; i<response.data.length; i++) {
        explore.appendChild(createNewPost(response.data[i], false));
    }
});