// creates a post - the writer of the post is shown if knownUser parameter is false, otherwise it is not displayed
export function createNewPost(data, index) {
    const post = document.createElement("article");
    post.class = "post col-12 col-md-8 mx-auto";
    post.id = "post-" + index;
    if (window.location.href.includes("profile") || window.location.href.includes("posthistory")) {
        post.innerHTML = `<h3 class="post-title col-10">${data["Title"]}</h3>
                            <div class="user-username d-none"> ${data["Writer"]} </div>`;
    } else if (window.location.href.includes("feed") || window.location.href.includes("favorites")) {
        post.innerHTML = `<div class="row">
                            <img class="star-post col-1" src="../icons/star_icon.png" alt="star post"/>
                            <h3 class="post-title col-10" id="post-header">${data["Title"]} ~ ${data["Writer"]}</h3>
                            <div class="user-username d-none col"> ${data["Writer"]} </div>
                          </div>`;
    } else if (window.location.href.includes("explore")) {
        post.innerHTML = `<div class="d-flex justify-content-start">
                            <img class="star-post" src="../icons/star_icon.png" alt="star post"/>
                            <h3 class="post-title" id="post-header">${data["Title"]} ~ *****</h3>
                            <div class="user-username d-none"> ${data["Writer"]} </div>
                          </div>`;
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
                <img class="rating thoughtfulness" style="display: none" src="../icons/thoughtfulness_icon.png"
                     alt="rate as thoughtfulness">
                <img class="rating idea" style="display: none" src="../icons/ideas_icon.png"
                     alt="rate as idea">
                <img class="rating advice" style="display: none" src="../icons/advice_icon.png"
                     alt="rate as advice">
                <img class="rating laugh" style="display: none" src="../icons/humour_icon.png"
                     alt="rate as humour">
                <img class="comment-post" style="margin-bottom: 6px" src="../icons/comment_icon.png"
                     alt="comment">
            </div>
        </div>`;
    if (!window.location.href.includes("profile") && !window.location.href.includes("posthistory")) {
        let star = post.getElementsByClassName("star-post")[0];
        star.addEventListener("click", () => starPost(post));
        axios.get("../php/favorites-api.php").then((response) => {
            if (response.data != null) {
                const favorites_id = [];
                response.data.forEach(elem => favorites_id.push(elem["PostID"]));
                if (favorites_id.includes(data["PostID"])) {
                    star.src = "../icons/starred_icon.png";
                    showUsername(post);
                }
            }
        });
    }
    post.getElementsByClassName("change-text-button")[0].addEventListener("click", () => changeText(post));
    post.getElementsByClassName("rate-post")[0].addEventListener("click", () => showRatingCategories(post));
    let ratingCategories = Array.from(post.getElementsByClassName("rating"));
    ratingCategories[0].addEventListener("click", () => addRating(post, "thoughtfulness"));
    ratingCategories[1].addEventListener("click", () => addRating(post, "ideas"));
    ratingCategories[2].addEventListener("click", () => addRating(post, "advice"));
    ratingCategories[3].addEventListener("click", () => addRating(post, "humour"));
    post.getElementsByClassName("comment-post")[0].addEventListener("click", () => showComments(post));
    axios.get("../php/rating-api.php", {params: {PostID: data["PostID"]}}).then((response) => {
        if (response.data != null) {
            changeIcon(post, response.data);
            showUsername(post);
        }
    });
    return post;
}