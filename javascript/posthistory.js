import { createNewPost } from "./commons.js";

function updateSearch(text) {
    if (text != null && text.length > 0) {
        displaySearch(text);
    } else {
        displayAllPosts();
    }
}

function displayAllPosts() {
    axios.get('../php/posthistory-api.php', {params: {username: user}}).then(response => {
        section.innerHTML = "";
        for (let i=0; i<response.data.length; i++) {
            section.appendChild(createNewPost(response.data[i], i));
        }
    });
}

function displaySearch(text) {
    axios.get('../php/explore-api-search.php', {params: {keyword: text, username: user}}).then(response => {
        section.innerHTML = "";
        for (let i=0; i<response.data.length; i++) {
            section.appendChild(createNewPost(response.data[i], i));
        }
    });
}

$("#keyword-search").on("keyup", function () {
    updateSearch($(this).val());
});

const user = new URL(window.location.href).searchParams.get("Username");
const section = document.getElementById("all-posts");
const h1 = document.querySelector("header h1");
h1.innerHTML = session_user + "'s post history";
displayAllPosts();
