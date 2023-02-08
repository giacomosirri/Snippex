import { createNewPost } from "./commons.js";

function updateSearch(text) {
    if (text != null && text.length > 0) {
        displaySearch(text);
    } else {
        displayAllPosts();
    }
}

function displayAllPosts() {
    axios.get('../php/favorites-api.php', {params: {username: session_user}}).then(response => {
        section.innerHTML = "";
        console.log(response.data);
        for (let i=0; i<response.data.length; i++) {
            const div = document.createElement("div");
            div.className = "post-with-buttons row";
            const empty = document.createElement("div");
            empty.className = "col-1";
            div.appendChild(empty);
            const post_div = document.createElement("div");
            post_div.className = "col-9";
            post_div.appendChild(createNewPost(response.data[i], i));
            div.appendChild(post_div);
            section.appendChild(div);
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

const section = document.getElementById("posts");
displayAllPosts();
const h1 = document.querySelector("header h1");
h1.innerText = "Favorite posts";
