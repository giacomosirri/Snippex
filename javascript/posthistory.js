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
            const div = document.createElement("div");
            div.className = "post-with-buttons row";
            const empty = document.createElement("div");
            empty.className = "col-1";
            div.appendChild(empty);
            const post_div = document.createElement("div");
            post_div.className = "col-9";
            post_div.appendChild(createNewPost(response.data[i], i));
            div.appendChild(post_div);
            const ops_div = document.createElement("div");
            ops_div.className = "col-2 d-flex justify-content-center flex-column";
            ops_div.innerHTML = `
                <img src="../icons/edit_icon.png" alt="edit post" id="edit-post" />
                <br /><br /><br /><br />
                <img src="../icons/bin_icon.png" alt="delete post" id="delete-post" />
            `;
            div.appendChild(ops_div);
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

const user = new URL(window.location.href).searchParams.get("Username");
const section = document.getElementById("all-posts");
const h1 = document.querySelector("header h1");
h1.innerHTML = session_user + "'s post history";
displayAllPosts();
