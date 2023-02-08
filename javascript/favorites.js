import { createNewPost } from "./commons.js";

function displayPosts(favorites) {
    favorites.forEach(post => section.appendChild(createNewPost(post)));
}

function updateSearch(text) {
    section.innerHTML = "";
    axios.get('../php/favorites-api.php', {params: {username: session_user}}).then(response => {
        if (text != null && text.length > 0) {
            axios.get('../php/favorites-api.php', {params: {keyword: text, username: session_user}})
                .then(response => displayPosts(response.data));
        } else {
            displayPosts(response.data);
        }
    });
}

$("#keyword-search").on("keyup", function () {
    updateSearch($(this).val());
});

const section = document.getElementById("posts");
const h1 = document.querySelector("header h1");
h1.innerText = "Favorite posts";
axios.get('../php/favorites-api.php', {params: {username: session_user}}).then(response => displayPosts(response.data));