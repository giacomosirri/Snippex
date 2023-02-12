let editModal = document.getElementById("editModal");
editModal.addEventListener("show.bs.modal", (event) => {
    let post = event.relatedTarget.closest(".post-with-buttons");
    console.log(post);
    let id = post.getElementsByClassName("post-id")[0].innerText;
    let text = post.getElementsByClassName("post-text")[0].innerText;
    let title = post.getElementsByClassName("post-title")[0].innerText;
    document.getElementById("post-edit-id").value = id;
    document.getElementById("post-text").value = text;
    document.getElementById("post-title").value = title;
});
document.getElementById("post-edit").addEventListener("click", () => editPost());

let deleteModal = document.getElementById("deleteModal");
deleteModal.addEventListener("show.bs.modal", (event) => {
    let post = event.relatedTarget.closest(".post-with-buttons");
    document.getElementById("post-delete-id").value = post.getElementsByClassName("post-id")[0].innerText;
});
document.getElementById("post-delete").addEventListener("click", () => deletePost());
function updateSearch(text) {
    section.innerHTML = "";
    if (text != null && text.length > 0) {
        displaySearch(text);
    } else {
        displayAllPosts();
    }
}

function displaySinglePost(data) {
    const div = document.createElement("div");
    div.className = "post-with-buttons row";
    const post_div = document.createElement("div");
    post_div.className = "col-10";
    post_div.appendChild(createNewPost(data));
    div.appendChild(post_div);
    const ops_div = document.createElement("div");
    ops_div.className = "buttons col-1 d-flex justify-content-center flex-column";
    ops_div.innerHTML = `
                <a href="#" data-bs-toggle="modal" data-bs-target="#editModal"><img src="../icons/edit_icon.png" alt="edit post" class="edit-post"/></a>
                <br /><br /><br /><br />
                <a href="#" data-bs-toggle="modal" data-bs-target="#deleteModal"><img src="../icons/bin_icon.png" alt="delete post" class="delete-post"/></a>
            `;
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

function editPost() {
    let id = document.getElementById("post-edit-id").value;
    let newTitle = document.getElementById("post-title").value;
    let newContent = document.getElementById("post-text").value;
    if ((newTitle != null && newTitle.length > 0) || (newContent != null && newContent.length > 0)) {
        axios.post("../php/insertions-api.php", {id: id, title: newTitle, content: newContent, action: "edit"});
        window.location.reload();
    }
}

function deletePost() {
    let id = document.getElementById("post-delete-id").value;
    axios.post("../php/insertions-api.php", {id: id, action: "delete"});
    window.location.reload();
}

$("#keyword-search").on("keyup", function () {
    updateSearch($(this).val());
});

const user = new URL(window.location.href).searchParams.get("Username");
const section = document.getElementById("posts");
const h3 = document.querySelector("header h3");
h3.innerHTML = user + "'s post history";
displayAllPosts();
