window.onload = function() {
    document.querySelectorAll("article label").forEach(label => changeText(label));
    let goBackButton = document.getElementById("go-back");
    if (goBackButton !== null) {
        goBackButton.addEventListener("click", goBack);
    }
    document.getElementById("post-button").addEventListener("click", createPost);
    document.getElementById("nav-logo").addEventListener("click", ()=>window.location.href = "../php/profile.php");
    setUpModal();
}

function getDaysInFebruary(year) {
    return ((year%4 === 0 && year%100 !== 0) || year%400 === 0) ? 29 : 28;
}

function isLastOfMonth(date) {
    const month_31 = [1,3,5,7,8,10,12];
    const month_30 = [4,6,9,11];
    return (month_31.includes(date.getUTCMonth()) && date.getUTCDate() === 31) ||
           (month_30.includes(date.getUTCMonth()) && date.getUTCDate() === 30) ||
           getDaysInFebruary(date.getUTCFullYear()) === date.getUTCDate();
}

function calculateTimeElapsed(date) {
    const ONE_MINUTE = 60 * 1000;
    const ONE_HOUR = 60 * ONE_MINUTE;
    const ONE_DAY = 24 * ONE_HOUR;
    const ONE_MONTH = 30 * ONE_DAY;
    const now = Date.now();
    const today = new Date();
    date = new Date(date);
    const elapsed = now - date;
    if (elapsed < ONE_MINUTE) {
        return "just now";
    } else if (elapsed < 2 * ONE_MINUTE) {
        return "one minute ago";
    } else if (elapsed < ONE_HOUR) {
        const minutes = Math.floor(elapsed / ONE_MINUTE);
        return minutes + " minutes ago";
    } else if (elapsed < 2 * ONE_HOUR) {
        return "one hour ago";
    } else if (elapsed < ONE_DAY) {
        const hours = Math.floor(elapsed / ONE_HOUR);
        return hours + " hours ago";
    } else if (elapsed < ONE_MONTH) {
        if (today.getUTCDate()-date.getUTCDate() === 1 || (today.getUTCDate() === 1 && isLastOfMonth(date))) {
            return "yesterday";
        } else {
            const days = Math.ceil(elapsed / ONE_DAY);
            return days + " days ago";
        }
    } else if (elapsed < 2 * ONE_MONTH) {
        return "one month ago";
    } else if (elapsed < 7 * ONE_MONTH) {
        const months = Math.floor(elapsed / ONE_MONTH);
        return months + " months ago";
    } else {
        return "long time ago";
    }
}

function createPost() {
    let title = document.querySelector("#recipient-title").value;
    let content = document.querySelector("#message-text").value;
    let close = document.querySelector("#close");
    axios.post("../php/insertions-api.php", {title: title, content: content, action: "create"});
    $("#recipient-title").val("");
    $("#message-text").val("");
    close.click();
}

function changeText(label) {
    let paragraph = label.querySelector('p');
    if (paragraph.style.webkitLineClamp === "3") {
        paragraph.style.webkitLineClamp = "unset";
    } else {
        paragraph.style.webkitLineClamp = "3";
    }
}

function showRatingCategories(post) {
    const div = post.getElementsByClassName("post-interactions")[0];
    const icons = div.children;
    for (let i=0; i<icons.length; i++) {
        if(icons[i].className==="rate-post") {
            icons[i].style.display = "none";
        } else {
            icons[i].style.display = "inline";
        }
    }
}

function starPost(post) {
    const postId = post.getElementsByClassName("post-id")[0];
    const star = post.getElementsByClassName("star-post")[0];
    if (star.src.includes("starred_icon.png")) {
        axios.post("../php/favorites-api.php", {unstar: true, post: postId.innerText});
        star.src = "../icons/star_icon.png";
        if (window.location.href.includes("favorites")) {
            location.reload();
        }
    } else {
        axios.post("../php/favorites-api.php", {star: true, post: postId.innerText});
        star.src = "../icons/starred_icon.png";
        if (window.location.href.includes("explore")) {
        }
    }
}

function addRating(post, rating) {
    let img = post.getElementsByClassName("rate-post")[0];
    if (img.src.includes("plus_icon.png")) {
        const postId = post.getElementsByClassName("post-id")[0];
        axios.post("../php/insertions-api.php", {rating: rating, post: postId.innerText, action: "addRating"});
        showPlus(post, rating);
    } else {
        const postId = post.getElementsByClassName("post-id")[0];
        axios.post("../php/insertions-api.php", {rating: rating, post: postId.innerText, action: "changeRating"});
        showPlus(post, rating);
    }
}

function showPlus(post, rating) {
    const div = post.getElementsByClassName("post-interactions")[0];
    const icons = div.children;
    for (let i=0; i<icons.length-1; i++) {
        if (icons[i].className==="rate-post" || icons[i].className==="comment-post") {
            icons[i].style.display = "inline";
        } else {
            icons[i].style.display = "none";
        }
    }
    changeIcon(post, rating);
    if (window.location.href.includes("explore")) {
        showUsername(post);
    }
}

function changeIcon(post, rating) {
    const div = post.getElementsByClassName("post-interactions")[0];
    const icons = div.children;
    icons[0].src = "../icons/" + rating + "_icon.png";
}

function showComments(post) {
    const postId = post.getElementsByClassName("post-id")[0];
    window.open("comments.php?PostID=" + postId.innerText, "_self");
    console.log(postId.innerText);
}

function goBack() {
    window.history.back();
}

function showUsername(post) {
    const username = post.getElementsByClassName("user-username")[0].innerHTML;
    const postTitle = post.getElementsByClassName("post-title")[0];
    const title = postTitle.innerText.split(" ~ ")[0];
    postTitle.innerHTML = `${title} ~ <a href="../php/profile.php?Username=${username}">${username}</a>`;
}

async function getUserProfilePic(username) {
    const default_pic = "../profile_pics/unknown-man.png";
    return axios.get('../php/image-api.php?Username=' + username).then(response => {
        const image = response.data[0]["ProfilePic"];
        if (image === null) {
            return "../profile_pics/" + default_pic;
        } else {
            return "../profile_pics/" + image;
        }
    });
}

function friendshipRequest(requesting, requested) {
    axios.put('../php/friends-api.php', {Requesting: requesting, Requested: requested, Type: "request"});
}

function friendshipAcceptance(id, passive_user) {
    axios.put('../php/friends-api.php', {ID: id, Type: "acceptance", External_user: passive_user});
}

function friendshipRejection(id, passive_user) {
    let alertModal = new bootstrap.Modal(document.getElementById("alertModal"));
    document.getElementById("error-message").innerText = "Are you sure? This action is definitive.";
    document.getElementById("alert-proceed").eventListeners = [];
    document.getElementById("alert-proceed").addEventListener("click", () => {
        axios.put('../php/friends-api.php', {ID: id, Type: "rejection", External_user: passive_user});
        alertModal.hide();
        window.location.reload();
    }  );
    alertModal.show();
}

function friendshipTermination(id, passive_user) {
    let alertModal = new bootstrap.Modal(document.getElementById("alertModal"));
    document.getElementById("error-message").innerText = "Are you sure? This action is definitive.";
    document.getElementById("alert-proceed").eventListeners = [];
    document.getElementById("alert-proceed").addEventListener("click", () => {
        axios.put('../php/friends-api.php', {ID: id, Type: "termination", External_user: passive_user});
        alertModal.hide();
        window.location.reload();
    });
    alertModal.show();
}


function createAcceptFriendshipButton(id, accepted_user) {
    const accept = document.createElement("button");
    accept.className = "btn btn-outline-primary accept";
    accept.innerText = "Accept";
    accept.addEventListener("click", () => friendshipAcceptance(id, accepted_user));
    return accept;
}

function createRejectFriendshipButton(id, rejected_user) {
    const reject = document.createElement("button");
    reject.className = "btn btn-outline-danger reject";
    reject.innerText = "Reject";
    reject.addEventListener("click", () => friendshipRejection(id, rejected_user));
    return reject;
}

function createRequestFriendshipButton(requesting_user, requested_user) {
    const button = document.createElement("button");
    button.className = "btn btn-primary";
    button.innerText = "Request friendship";
    button.addEventListener("click", () => friendshipRequest(requesting_user, requested_user));
    return button;
}

function createTerminateFriendshipButton(id, terminated_user) {
    const button = document.createElement("button");
    button.className = "btn btn-danger";
    button.innerText = "End friendship";
    button.addEventListener("click", () => friendshipTermination(id, terminated_user));
    return button;
}

// BAD IMPLEMENTATION: needs refactoring
// This function takes as input two usernames and returns the status of QUERIED_USER in relation to MAIN_USER
// There are four possible statuses:
// 1. FRIEND - MAIN_USER and QUERIED_USER are friends currently,
// 2. SENT - MAIN_USER has sent its request to QUERIED_USER who has yet to decide,
// 3. RECEIVED - MAIN_USER has received QUERIED_USER's request and has to decide,
// 4. NOT - MAIN_USER and QUERIED_USER are not friends currently.
function getFriendshipStatus(main_user, queried_user) {
    return axios.get('../php/friends-api.php', {params: {Username: main_user}}).then(response => {
        const current_friends = response.data["current"];
        const requested_friends = response.data["requested"];
        const waiting_friends = response.data["incoming"];
        for (let i=0; i<current_friends.length; i++) {
            if (current_friends[i]["Username"] === queried_user) {
                return {
                    "status": "FRIEND",
                    "friendshipID": current_friends[i]["FriendshipID"],
                    "requested_user": queried_user
                }
            }
        }
        for (let i=0; i<requested_friends.length; i++) {
            if (requested_friends[i]["Username"] === queried_user) {
                return {
                    "status": "SENT",
                    "friendshipID": requested_friends[i]["FriendshipID"],
                    "requested_user": queried_user
                }
            }
        }
        for (let i=0; i<waiting_friends.length; i++) {
            if (waiting_friends[i]["Username"] === queried_user) {
                return {
                    "status": "RECEIVED",
                    "friendshipID": waiting_friends[i]["FriendshipID"],
                    "requested_user": queried_user
                }
            }
        }
        return {
            "status": "NOT",
            "friendshipID": null,
            "requested_user": queried_user
        };
    });
}

function setUpModal() {
    let modal = document.createElement("div");
    modal.innerHTML = `
        <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Error</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="col-form-label" id="error-message"></label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
                    </div>
                </div>
            </div>
         </div>`;
    document.body.appendChild(modal);
    modal.innerHTML = `
        <div class="modal fade" id="alertModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Alert</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="col-form-label" id="error-message"></label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button> 
                        <button type="button" class="btn btn-primary" id="alert-proceed" data-bs-dismiss="modal">Ok</button>
                    </div>
                </div>
            </div>
         </div>`;
}
