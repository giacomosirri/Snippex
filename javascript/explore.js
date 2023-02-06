import { createNewPost } from "./commons.js";

function updateSearch(text) {
    explore.innerHTML = "";
    if (text != null && text.length > 0) {
        displaySearch(text);
    } else {
        displayAllPosts();
    }
}

function displayAllPosts() {
    axios.get('../php/explore-api.php').then(response => {
        for (let i = 0; i < response.data.length; i++) {
            explore.appendChild(createNewPost(response.data[i], i));
        }
    });
}

function displaySearch(text) {
    axios.get('../php/explore-api-search.php', {params: {keyword: text}}).then(response => {
        for (let i=0; i<response.data.length; i++) {
            explore.appendChild(createNewPost(response.data[i], i));
        }
    });
}

const explore = document.getElementById("explore-posts");
$("#keyword-search").on("keyup", function () {
    updateSearch($(this).val());
});
displayAllPosts();