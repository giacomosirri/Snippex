// creates a post - the writer of the post is shown if knownUser parameter is false, otherwise it is not displayed
export function createNewPost(data, index) {
    const post = document.createElement("article");
    post.class = "post col-12 col-md-8 mx-auto";
    post.id = "post-" + index;
    if (window.location.href.includes("profile")) {
        post.innerHTML = `<h3 class="post-title col-10">${data["Title"]}</h3>
                            <div class="user-username d-none"> ${data["Writer"]} </div>`;
    } else if (window.location.href.includes("feed")) {
        post.innerHTML = `<h3 class="post-title col-10">${data["Title"]} ~ ${data["Writer"]}</h3>
                            <div class="user-username d-none"> ${data["Writer"]} </div>`;
    } else {
        post.innerHTML = `<h3 class="post-title col-10" id="post-header">${data["Title"]} ~ *****</h3>
                            <div class="user-username d-none"> ${data["Writer"]} </div>`;
    }
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
            <div class="post-interactions d-flex justify-content-between flex-column">
                <img class="rate-post" style="padding: 5px; border-radius: 20px;"
                     src="../icons/plus_icon.png" alt="post menu"/>
                <img class="rating thoughtfulness" style="display: none" src="../icons/thoughts_icon.png"
                     alt="rate as thoughtfulness">
                <img class="rating idea" style="display: none" src="../icons/idea_icon.png"
                     alt="rate as idea">
                <img class="rating advice" style="display: none" src="../icons/advice_icon.png"
                     alt="rate as advice">
                <img class="rating laugh" style="display: none" src="../icons/laugh_icon.png"
                     alt="rate as humour">
                <img class="comment-post" style="margin-bottom: 6px" src="../icons/comment_icon.png"
                     alt="comment">
            </div>
        </div>`;
    post.getElementsByClassName("change-text-button")[0]
        .addEventListener("click", () => changeText(post));
    post.getElementsByClassName("rate-post")[0]
        .addEventListener("click", () => showRatingCategories(post));
    let ratingCategories = Array.from(post.getElementsByClassName("rating"));
    ratingCategories[0].addEventListener("click", () => addRating(post, "thoughtfulness"));
    ratingCategories[1].addEventListener("click", () => addRating(post, "ideas"));
    ratingCategories[2].addEventListener("click", () => addRating(post, "advice"));
    ratingCategories[3].addEventListener("click", () => addRating(post, "humour"));
    post.getElementsByClassName("comment-post")[0]
        .addEventListener("click", () => showComments(post));
    return post;
}