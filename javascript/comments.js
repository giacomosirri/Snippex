const url_string = window.location.href;
const url = new URL(url_string);
const comments = document.getElementById("comments");


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
        </div>`;
    comment.getElementsByClassName("change-text-button")[0]
        .addEventListener("click", () => changeText(comment));
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

axios.get('../php/comments-api.php', {params: {PostID: url.searchParams.get("PostID")}}).then(response => {
    comments.appendChild(createHeaderPost(response.data["post"][0]));
    for (let i=0; i<response.data["comments"].length; i++) {
         comments.appendChild(createNewComment(response.data["comments"][i]));
    }
});