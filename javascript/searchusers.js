const col = 4;
const desktopSize = 1025;
const tabletSize = 600;
const padding = 0.03;
let last_keydown = 0;
let typing = false;

setInterval(() => {
    if (Date.now()-last_keydown > 200 && typing) {
        addProposal($("#username").val());
        typing = false;
    }
}, 200);

window.onload = () => {
    document.getElementById("username").onkeydown = () => {
        last_keydown = Date.now();
        typing = true;
    }
    if (sessionStorage["username"]) {
        document.getElementById("username").value = window.sessionStorage.getItem("username");
    }
    addProposal(document.getElementById("username").value);
    sessionStorage.removeItem("username");
};
window.onresize = () => {
    adaptFriendsSizeToDisplay();
    adaptButtonsSizeToDisplay();
}

function adaptFriendsSizeToDisplay() {
    const all_friends = document.getElementsByClassName("friend");
    for (let i=0; i<all_friends.length; i++) {
        const img = all_friends[i].querySelector("img");
        img.style.maxWidth = calculateImageMaxWidth() + "px";
    }
}

function calculateImageMaxWidth() {
    // actual width is the full screen width minus the padding and the margins of the images
    const main_width = (window.innerWidth > desktopSize) ? innerWidth * 0.60 : innerWidth;
    const actualWidth = main_width * 0.9 * (col/12) - 8;
    return Math.floor(actualWidth);
}

function adaptButtonsSizeToDisplay() {
    const rejects = document.getElementsByClassName("reject");
    const accepts = document.getElementsByClassName("accept");
    for (let i=0; i<rejects.length; i++) {
        if (window.innerWidth < 410) {
            rejects[i].innerText = "NO";
        } else if (window.innerWidth < tabletSize) {
            rejects[i].innerText = "Deny";
        } else {
            rejects[i].innerText = "Reject";
        }
    }
    for (let i=0; i<rejects.length; i++) {
        if (window.innerWidth < tabletSize) {
            accepts[i].innerText = "OK";
        } else {
            accepts[i].innerText = "Accept";
        }
    }
}

function addProposal(user) {
    if (user != null && user.length > 0) {
        displayProposal(user);
    } else {
        displayRecentSearch();
    }
}

function displayProposal(user) {
    const h3 = document.querySelector("h3");
    h3.innerText = "We have found these people that match the input '" + user + "':";
    return axios.get('../php/searchusers-api-proposal.php', {params: {Username: user}}).then(response => {
        document.getElementById("proposes").innerHTML = "";
        return appendUsers(response.data.map(x => x.Username));
    });
}

function displayRecentSearch() {
    const h3 = document.querySelector("h3");
    h3.innerText = "Recent searches:"
    axios.get('../php/searchusers-api-recentsearch.php').then(response => {
        document.getElementById("proposes").innerHTML="";
        if (response.data.length > 0) {
            return appendUsers(response.data);
        }
    });
}

function getPointsFromCategory(stats, category) {
    for (let i=0; i<stats.length; i++) {
        if (stats[i]["Category"] === category) {
            return stats[i]["Points"];
        }
    }
    return 0;
}

function appendUser(user) {
    axios.get('../php/userprofile-api.php', {params: {Username: user}}).then(response => {
        const numberOfPosts = response.data["user-data"][0]["NumberOfPosts"];
        const numberOfFriends = response.data["user-data"][0]["NumberOfFriends"];
        const ratingStats = response.data["rating-stats"];
        const categories = response.data["categories"];
        return simpleAppendUser(user, numberOfPosts, numberOfFriends, ratingStats, categories);
    });
}

function simpleAppendUser(user, numberOfPosts, numberOfFriend, ratingStats, categories) {
    let container = document.createElement("div");
    let row = document.createElement("div");
    let col1 = document.createElement("div");
    let col2 = document.createElement("div");
    row.classList.add("row");
    row.classList.add("friend");
    col1.classList.add("col-4");
    col2.classList.add("col-4");
    getUserProfilePic(user).then(image => {
        const img = document.createElement("img");
        img.className = "selected-users-profile-pics";
        img.alt = "profile pic";
        img.src = image;
        img.addEventListener("click", () => {
            addRecentUser(user);
            window.location.replace("./userprofile.php?Username=" + user);
        })
        col1.appendChild(img);
        img.onload = () => img.style.maxWidth = calculateImageMaxWidth() + "px";
    });
    col2.innerHTML += `
        <div class="username"><strong>~${user}</strong></div>
        <div class="posts">posts: ${numberOfPosts}</div>
    `;
    for (let i=0; i<categories.length; i++) {
        col2.innerHTML+=`<div class="points">${categories[i]["Name"]}: ${getPointsFromCategory(ratingStats, categories[i]["Name"])}</div>`;
    }
    row.appendChild(col1);
    setTimeout(() => {
        row.appendChild(col2);
        container.appendChild(row);
        if (user !== session_user) {
            getFriendshipStatus(session_user, user).then(data =>
                row.appendChild(manageFriendshipStatus(data["status"], data["friendshipID"], data["requested_user"])));
        } else {
            let col = document.createElement("div");
            col.classList.add("col-2");
            row.appendChild(col);
        }
    }, 150);
    document.getElementById("proposes").appendChild(container);
}

function manageFriendshipStatus(status, friendshipID, requested_user) {
    const div = document.createElement("div");
    div.classList.add("friendship-status");
    div.className = "col-" + col;
    const p = document.createElement("p");
    p.classList.add("friendship-status");
    div.innerHTML = "";
    if (status === "RECEIVED") {
        p.innerText = requested_user + " has asked for your friendship!";
        div.appendChild(p);
        const accept = createAcceptFriendshipButton(friendshipID, requested_user);
        if (window.innerWidth < tabletSize) {
            accept.innerText = "OK";
        }
        accept.addEventListener("click", () => saveAndRefresh());
        div.appendChild(accept);
        const reject = createRejectFriendshipButton(friendshipID, requested_user);
        if (window.innerWidth < 410) {
            reject.innerText = "NO";
        } else if (window.innerWidth < tabletSize) {
            reject.innerText = "Deny";
        }
        reject.addEventListener("click", () => saveAndRefresh());
        div.appendChild(reject);
    } else if (status === "SENT") {
        p.innerText = "You have asked " + requested_user + " to become friends! Now you just need to wait for his approval.";
        div.appendChild(p);
    } else if (status === "FRIEND") {
        p.innerText = "You are friend with " + requested_user;
        div.appendChild(p);
        const terminate = createTerminateFriendshipButton(friendshipID, requested_user);
        terminate.addEventListener("click", () => saveAndRefresh());
        div.appendChild(terminate);
    } else {
        let request = createRequestFriendshipButton(session_user, requested_user);
        request.addEventListener("click", () => saveAndRefresh());
        div.appendChild(request);
    }
    return div;
}

function saveAndRefresh() {
    window.sessionStorage.setItem("username", document.getElementById("username").value);
    location.reload();
}

function appendUsers(users) {
    const usersWithoutDuplicate = new Set(users);
    usersWithoutDuplicate.forEach(x => appendUser(x));
}

function addRecentUser(user) {
    axios.get('../php/searchusers-api-recentsearch.php', {params:{Username:user}});
}
