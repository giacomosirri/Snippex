const url_string = window.location.href;
const url = new URL(url_string);
const comments = document.getElementById("comments");

$("#comment-input").submit(function(e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.
    let form = $(this);
    let actionUrl = form.attr('action');
    axios.post(actionUrl, form.serialize());
    window.location.reload();
});

let editModal = document.getElementById("editModal");
editModal.addEventListener("show.bs.modal", (event) => {
    let comment = event.relatedTarget.closest("article");
    let id = comment.getElementsByClassName("comment-id")[0].innerText;
    let text = comment.getElementsByClassName("comment-text")[0].innerText;
    document.getElementById("comment-edit-id").value = id;
    document.getElementById("comment-text").value = text;
});
document.getElementById("comment-edit").addEventListener("click", () => editComment());

let deleteModal = document.getElementById("deleteModal");
deleteModal.addEventListener("show.bs.modal", (event) => {
    let comment = event.relatedTarget.closest("article");
    document.getElementById("comment-delete-id").value = comment.getElementsByClassName("comment-id")[0].innerText;
});
document.getElementById("comment-delete").addEventListener("click", () => deleteComment());

function createNewComment(data) {
    const comment = document.createElement("article");
    comment.className = "comment";
    comment.innerHTML = `
        <h3 class="post-title col-10">~ ${data["User"]}</h3>
        <div class="comment-id d-none"> ${data["CommentID"]} </div>
        <div class="d-flex justify-content-between">
            <div class="post-content col-12 position-relative">
                <label class="change-text-button">
                    <p class="comment-text">
                        ${data["Content"]}
                    </p>
                </label>
                <p class="post-date col-12">${calculateTimeElapsed(data["DateAndTime"])}</p>
            </div>
            <div class="comment-interactions d-flex justify-content-between flex-column">
                <a href="#" data-bs-toggle="modal" data-bs-target="#editModal"><img class="modify" style="padding: 5px; border-radius: 20px; display:none;" src="../icons/edit_icon.png" alt="modify"/></a>
                <a href="#" data-bs-toggle="modal" data-bs-target="#deleteModal"><img class="delete" style="padding: 5px; border-radius: 20px; display: none;" src="../icons/bin_icon.png" alt="delete"/></a>
            </div>
        </div>`;
    comment.getElementsByClassName("change-text-button")[0]
        .addEventListener("click", () => changeText(comment));
    if (data["User"] === session_user) {
        comment.className = "editable-comment";
        comment.getElementsByClassName("modify")[0].style.display = "block";
        comment.getElementsByClassName("delete")[0].style.display = "block";
    }
    return comment;
}

function createHeaderPost(data) {
    const post = document.createElement("article");
    post.className = "post-comment";
    post.id = "post";
    post.innerHTML = `
        <h3 class="post-title col-10">${data["Title"]} ~ <a href="../php/userprofile.php?Username=${data["Writer"]}">${data["Writer"]}</a></h3>
        <div class="user-username d-none"> ${data["Writer"]} </div>
    `;
    post.innerHTML += `
        <div class="post-id d-none"> ${data["PostID"]} </div>
        <div class="d-flex justify-content-between">
            <div class="post-content col-12 position-relative">
                <label class="change-text-button">
                    <p class="post-text">
                        ${data["Content"]}
                    </p>
                </label>
                <p class="post-date col-12">${calculateTimeElapsed(data["DateAndTime"])}</p>
            </div>
        </div>
    `;
    post.getElementsByClassName("change-text-button")[0]
        .addEventListener("click", () => changeText(post));
    return post;
}

function editComment() {
    let id = document.getElementById("comment-edit-id").value;
    let text = document.getElementById("comment-text").value;
    if (text != null && text.length > 0) {
        axios.post('../php/comments-api.php', {id: id, text: text, action: "edit"});
        window.location.reload();
    }
    document.getElementById("comment-text").value = "";
}

function deleteComment() {
    let id = document.getElementById("comment-delete-id").value;
    axios.post('../php/comments-api.php', {id: id, action: "delete"});
    window.location.reload();
}

axios.get('../php/comments-api.php', {params: {PostID: url.searchParams.get("PostID")}}).then(response => {
    comments.appendChild(createHeaderPost(response.data["post"][0]));
    for (let i=0; i<response.data["comments"].length; i++) {
         comments.appendChild(createNewComment(response.data["comments"][i]));
    }
});