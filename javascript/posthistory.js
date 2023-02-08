import { createNewPost } from "./commons.js";

function updateSearch(text) {
    section.innerHTML = "";
    if (text != null && text.length > 0) {
        displaySearch(text);
    } else {
        displayAllPosts();
    }
}

function displaySinglePost(data, id) {
    const div = document.createElement("div");
    div.className = "post-with-buttons row";
    const empty = document.createElement("div");
    empty.className = "col-1";
    div.appendChild(empty);
    const post_div = document.createElement("div");
    post_div.className = "col-9";
    post_div.appendChild(createNewPost(data, id));
    div.appendChild(post_div);
    const ops_div = document.createElement("div");
    ops_div.className = "col-2 d-flex justify-content-center flex-column";
    ops_div.innerHTML = `
                <img src="../icons/edit_icon.png" alt="edit post" id="edit-post" />
                <br /><br /><br /><br />
                <img src="../icons/bin_icon.png" alt="delete post" id="delete-post" />
            `;
    ops_div.querySelector("#edit-post").addEventListener("click", () => editPost(response.data[i]["PostID"], response.data[i]["Title"], response.data[i]["Content"]));
    ops_div.querySelector("#delete-post").addEventListener("click", () => deletePost(response.data[i]["PostID"]));
    div.appendChild(ops_div);
    return div;
}

function displayAllPosts() {
    axios.get('../php/posthistory-api.php', {params: {username: user}}).then(response => {
        for (let i=0; i<response.data.length; i++) {
            section.appendChild(displaySinglePost(response.data[i], i));
        }
    });
}

function displaySearch(text) {
    axios.get('../php/explore-api-search.php', {params: {keyword: text, username: user}}).then(response => {
        for (let i=0; i<response.data.length; i++) {
            section.appendChild(displaySinglePost(response.data[i], i));
        }
    });
}

function editPost(id, title, content) {
    let newTitle = prompt("Enter new title:", title);
    let newContent = prompt("Enter new text:", content);
    if ((newTitle != null && newTitle.length > 0) || (newContent != null && newContent.length > 0)) {
        axios.post("../php/insertions-api.php", {id: id, title: newTitle, content: newContent, action: "edit"});
        window.location.reload();
    }
}

function deletePost(id) {
    let result = confirm("Are you sure you want to delete this post?");
    if (result) {
        axios.post("../php/insertions-api.php", {id: id, action: "delete"});
        window.location.reload();
    }
}

$("#keyword-search").on("keyup", function () {
    updateSearch($(this).val());
});

const user = new URL(window.location.href).searchParams.get("Username");
const section = document.getElementById("posts");
const h1 = document.querySelector("header h1");
h1.innerHTML = session_user + "'s post history";
displayAllPosts();
