window.onload = function() {
    document.querySelectorAll("article label").forEach(label => changeText(label));
    let goBackButton = document.getElementById("go-back");
    if (goBackButton !== null) {
        goBackButton.addEventListener("click", goBack);
    }
    document.getElementById("post").addEventListener("click", createPost);
}

function createPost() {
    let title = document.querySelector("#recipient-title").value;
    let content = document.querySelector("#message-text").value;
    let close = document.querySelector("#close");
    axios.post("../php/insertions.php", {title: title, content: content});
    $("#recipient-title").val("");
    $("#message-text").val("");
    close.click();
}

function changeText(label) {
    let paragraph = label.querySelector('p');
    if (paragraph.style.webkitLineClamp === "4") {
        paragraph.style.webkitLineClamp = "unset";
    } else {
        paragraph.style.webkitLineClamp = "4";
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

function addRating(post, rating) {
    const postId = post.getElementsByClassName("post-id")[0];
    axios.post("../php/insertions-api.php", {rating: rating, post: postId.innerText});
    showPlus(post);
}

function showPlus(post) {
    const div = post.getElementsByClassName("post-interactions")[0];
    const icons = div.children;
    for (let i=0; i<icons.length-1; i++) {
        if(icons[i].className==="rate-post" || icons[i].className==="comment-post") {
            icons[i].style.display = "inline";
        } else {
            icons[i].style.display = "none";
        }
    }
    showUsername(post);
}

function showComments(post) {
    const postId = post.getElementsByClassName("post-id")[0];
    window.open("comments.php?PostID=" + postId.innerText, "_self");
    console.log(postId.innerText);
}

function goBack() {
    window.history.back();
}

function setMenuVisibility() {
    const menu = document.getElementById("options-menu");
    if (menu.style.display === "none") {
        menu.style.display = "inline";
    } else {
        menu.style.display = "none";
    }
}

function showUsername(post) {
    const username = post.getElementsByClassName("user-username")[0].innerText;
    const postTitle = post.getElementsByClassName("post-title")[0];
    postTitle.innerText = postTitle.innerText.split(" ~ ")[0] + " ~ " + username;
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

async function friendshipRequest(requesting, requested) {
    await axios.put('../php/friends-api.php', {User1: requesting, User2: requested, Type: "request"});
}

async function friendshipAcceptance(id) {
    await axios.put('../php/friends-api.php', {ID: id, Type: "acceptance"});
}

async function friendshipRejection(id) {
    alert("Are you sure? This action is definitive");
    await axios.put('../php/friends-api.php', {ID: id, Type: "rejection"});
}

function createAcceptFriendshipButton(id) {
    const accept = document.createElement("button");
    accept.className = "btn btn-outline-primary col-2 col-lg-1";
    accept.innerText = `Accept request`;
    accept.style.marginRight = "15px";
    accept.addEventListener("click", () => friendshipAcceptance(id).then(() => location.reload()));
    return accept;
}

function createRejectFriendshipButton(id) {
    const reject = document.createElement("button");
    reject.className = "btn btn-outline-danger col-2 col-lg-1";
    reject.innerText = `Reject request`;
    reject.style.marginRight = "15px";
    reject.addEventListener("click", () => friendshipRejection(id).then(() => location.reload()));
    return reject;
}

function createRequestFriendshipButton(requested_user) {
    const button = document.createElement("button");
    button.className = "btn btn-primary";
    button.innerText = "Request friendship";
    button.addEventListener("click", () => friendshipRequest(session_user, requested_user).then(() => {}));
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
