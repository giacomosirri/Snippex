import { createNewPost } from "./commons.js";

const url_string = window.location.href;
const url = new URL(url_string);
const user = url.searchParams.get("Username");
const feed = document.getElementById("feed-posts");

axios.get('../php/feed-api.php', {params: {Username: user}}).then(response => {
    for (let i=0; i<response.data["posts"].length; i++) {
        feed.appendChild(createNewPost(response.data["posts"][i], false));
    }
});