// creates a post - the writer of the post is shown if knownUser parameter is false, otherwise it is not displayed
export function createNewPost(data) {
    const post = document.createElement("article");
    post.class = "post col-12 col-md-8 mx-auto";
    const page = window.location.href;
    const current_user = new URL(page).searchParams.get("Username") ?? session_user;
    if (page.includes("userprofile") || (page.includes("history") && session_user !== current_user)) {
        post.innerHTML = `<div class="d-flex justify-content-start">
                            <img class="star-post" src="../icons/star_icon.png" alt="star post"/>
                            <h3 class="post-title" id="post-header">${data["Title"]}</h3>
                            <div class="user-username d-none">${data["Writer"]}</div>
                          </div>`;
    } else if (page.includes("profile") || page.includes("history")) {
        post.innerHTML = `<h3 class="post-title col-10">${data["Title"]}</h3>
                            <div class="user-username d-none"> ${data["Writer"]} </div>`;
    } else if (page.includes("feed") || page.includes("favorites")) {
        post.innerHTML = `<div class="d-flex justify-content-start">
                            <img class="star-post" src="../icons/star_icon.png" alt="star post"/>
                            <h3 class="post-title" id="post-header">${data["Title"]} ~ <a href="../php/userprofile.php?Username=${data['Writer']}">${data["Writer"]}</a></h3>
                            <div class="user-username d-none">${data["Writer"]}</div>
                          </div>`;
    } else if (page.includes("explore")) {
        post.innerHTML = `<div class="d-flex justify-content-start">
                            <img class="star-post" src="../icons/star_icon.png" alt="star post"/>
                            <h3 class="post-title" id="post-header">${data["Title"]} ~ *****</h3>
                            <div class="user-username d-none">${data["Writer"]}</div>
                          </div>`;
    }
    post.innerHTML += `
        <div class="post-id d-none"> ${data["PostID"]} </div>
        <div class="d-flex justify-content-between">
            <div class="post-content col-12 position-relative">
                <label class="change-text-button">
                    <p class="post-text">
                        ${data["Content"]}
                    </p>
                </label>
                <p class="post-date position-absolute bottom-0">${data["DateAndTime"]}</p>
            </div>
            <div class="post-interactions d-flex justify-content-between flex-column">
                <img class="rate-post"
                     src="../icons/plus_icon.png" alt="post menu"/>
                <img class="rating thoughtfulness" style="display: none" src="../icons/thoughtfulness_icon.png"
                     alt="rate as thoughtfulness">
                <img class="rating idea" style="display: none" src="../icons/ideas_icon.png"
                     alt="rate as idea">
                <img class="rating advice" style="display: none" src="../icons/advice_icon.png"
                     alt="rate as advice">
                <img class="rating laugh" style="display: none" src="../icons/humour_icon.png"
                     alt="rate as humour">
                <img class="comment-post" src="../icons/comment_icon.png"
                     alt="comment">
            </div>
        </div>`;
    if ((page.includes("profile") && current_user === session_user) || (page.includes("history") && current_user === session_user)) {
        post.getElementsByClassName("rate-post")[0].style.display = "none";
        post.getElementsByClassName("post-interactions")[0].className = "post-interactions d-flex justify-content-end flex-column";
    } else {
        let star = post.getElementsByClassName("star-post")[0];
        star.addEventListener('click', () => {
            console.log("ciao")
            starPost(post)
        });
        axios.get("../php/favorites-api.php").then((response) => {
            if (response.data != null) {
                const favorites_id = [];
                response.data.forEach(elem => favorites_id.push(elem["PostID"]));
                if (favorites_id.includes(data["PostID"])) {
                    star.src = "../icons/starred_icon.png";
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
            if (page.includes("explore")) {
                showUsername(post);
            }
        }
    });
    return post;
}