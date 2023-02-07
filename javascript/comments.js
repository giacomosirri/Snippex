const url_string = window.location.href;
const url = new URL(url_string);
const comments = document.getElementById("comments");

$("#comment-input").submit(function(e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.
    let form = $(this);
    let actionUrl = form.attr('action');
    axios.post(actionUrl, form.serialize());
});

function createNewComment(data) {
    const comment = document.createElement("article");
    comment.class = "comment col-12 col-md-8 mx-auto";
    comment.innerHTML = `
        <h3 class="post-title col-10">~ ${data["User"]}</h3>
        <div class="d-flex justify-content-between">
            <div class="post-content col-12">
                <label class="change-text-button">
                    <p class="post-text">
                        ${data["Content"]}
                    </p>
                </label>
                <p class="post-date col-12">${data["DateAndTime"]}</p>
            </div>
            <div class="comment-interactions d-flex justify-content-between flex-column">
                <img class="modify" style="padding: 5px; border-radius: 20px; display:none;" src="../icons/burger_icon.png" alt="modify">
                <img class="delete" style="padding: 5px; border-radius: 20px; display: none;" src="../icons/bin_icon.png" alt="delete">
            </div>
        </div>`;
    comment.getElementsByClassName("change-text-button")[0]
        .addEventListener("click", () => changeText(comment));
    if (data["User"] === session_user) {
        comment.getElementsByClassName("modify")[0].style.display = "block";
        comment.getElementsByClassName("delete")[0].style.display = "block";
        comment.getElementsByClassName("modify")[0]
            .addEventListener("click", () => editComment(data["CommentID"], data["Content"]));
        comment.getElementsByClassName("delete")[0]
            .addEventListener("click", () => deleteComment(data["CommentID"]));
    }
    return comment;
}

function createHeaderPost(data) {
    const post = document.createElement("article");
    post.class = "post col-12 col-md-8 mx-auto";
    post.id = "post";
    post.innerHTML = `<h3 class="post-title col-10">${data["Title"]} ~ ${data["Writer"]}</h3>
                        <div class="user-username d-none"> ${data["Writer"]} </div>`;
    post.innerHTML += `
        <div class="post-id d-none"> ${data["PostID"]} </div>
        <div class="d-flex justify-content-between">
            <div class="post-content col-12">
                <label class="change-text-button">
                    <p class="post-text">
                        ${data["Content"]}
                    </p>
                </label>
                <p class="post-date col-12">${data["DateAndTime"]}</p>
            </div>
        </div>`;
    post.getElementsByClassName("change-text-button")[0]
        .addEventListener("click", () => changeText(post));
    return post;
}

function editComment(id, content) {
    let text = prompt("Enter new text:", content);
    if (text != null && text.length > 0) {
        axios.post('../php/comments-api.php', {id: id, text: text, action: "edit"}).then(window.location.reload);
    }
}

function deleteComment(id) {
    let result = confirm("Are you sure?");
    if (result) {
        axios.post('../php/comments-api.php', {id: id, action: "delete"}).then(window.location.reload);
    }
}

axios.get('../php/comments-api.php', {params: {PostID: url.searchParams.get("PostID")}}).then(response => {
    comments.appendChild(createHeaderPost(response.data["post"][0]));
    for (let i=0; i<response.data["comments"].length; i++) {
         comments.appendChild(createNewComment(response.data["comments"][i]));
    }
});