// creates a post - the writer of the post is shown if knownUser parameter is false, otherwise it is not displayed
export function createNewPost(data) {
    const post = document.createElement("article");
    post.class = "post col-12 col-md-8 mx-auto";
    if (window.location.href.includes("profile")) {
        post.innerHTML = `<h3 class="post-title col-10" id="post-header">${data["Title"]}</h3>
                            <div class="d-none" id="user-username"> ${data["Writer"]} </div>`;
    } else if (window.location.href.includes("feed")) {
        post.innerHTML = `<h3 class="post-title col-10" id="post-header">${data["Title"]} ~ ${data["Writer"]}</h3>
                            <div class="d-none" id="user-username"> ${data["Writer"]} </div>`;
    } else {
        post.innerHTML = `<h3 class="post-title col-10" id="post-header">${data["Title"]} ~ *****</h3>
                            <div class="d-none" id="user-username"> ${data["Writer"]} </div>`;
    }
    console.log(data["PostID"]);
    post.innerHTML += `
        <div class="d-none" id="post-id"> ${data["PostID"]} </div>
        <div class="d-flex justify-content-between">
            <div class="post-content col-12">
                <label role="button" onclick="changeText(this)">
                    <p class="post-text">
                        ${data["Content"]}
                    </p>
                </label>
                <p class="post-date col-12">${data["DateAndTime"]}</p>
            </div>
            <div class="post-interactions d-flex justify-content-between flex-column">
                <img class="rate-post" style="padding: 5px; border-radius: 20px;"
                     src="../icons/plus_icon.png" alt="post menu" onclick="showRatingCategories(this)"/>
                <img class="thoughtfulness" style="display: none" src="../icons/thoughts_icon.png"
                     alt="rate as thoughtfulness" onclick="showPlus(this)">
                <img class="idea" style="display: none" src="../icons/idea_icon.png"
                     alt="rate as idea" onclick="showPlus(this)">
                <img class="advice" style="display: none" src="../icons/advice_icon.png"
                     alt="rate as advice" onclick="showPlus(this)">
                <img class="laugh" style="display: none" src="../icons/laugh_icon.png"
                     alt="rate as humour" onclick="showPlus(this)">
                <img class="comment-post" style="margin-bottom: 6px" src="../icons/comment_icon.png"
                     alt="comment" onclick="showComments(document.getElementById('post-id'))">
            </div>
        </div>`;
    return post;
}