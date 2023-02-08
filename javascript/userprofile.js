import {createNewPost} from "./commons.js";

function activeMenu(link) {
    const menu = document.querySelectorAll("header nav ul li a");
    menu.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
}

function createBasicInfo(data) {
    const section = document.createElement("section");
    const h1 = document.createElement("h1");
    h1.style.color = "black";
    h1.innerText = data["Name"] + " " + data["Surname"];
    const h2 = document.createElement("h2");
    h2.style.color = "black";
    h2.style.fontSize = "18px";
    h2.style.marginTop = "-14px";
    h2.innerText = "~" + data["Username"];
    const innerDiv = document.createElement("div");
    innerDiv.style.marginBottom = "5px";
    const img = document.createElement("img");
    img.id = "main-profile.pic";
    img.alt = "profile pic";
    getUserProfilePic(data["Username"]).then(image => img.src = image);
    section.appendChild(h1);
    innerDiv.appendChild(img);
    h2.appendChild(innerDiv);
    section.appendChild(h2);
    return section;
}

function addMostVotedPost(data) {
    const postFrame = document.createElement("div");
    postFrame.innerHTML = `
        <div class="col-12 col-md-8 d-flex justify-content-between">
            <h2>
                Most voted post ever
            </h2>
            <div>
                <a href="../php/posthistory.php?Username=${user}" class="d-flex justify-content-start" style="padding-top: 1%;
                                text-decoration: none; color: black">
                    <p style="font-size: 12px;">Browse history</p>
                    <div>
                        <img src="../icons/goarrow_icon.png" alt="browse history">
                    </div>
                </a>
            </div>
        </div>
    `;
    const post = createNewPost(data[0]);
    return postFrame.outerHTML + post.outerHTML;
}

// returns the number of points the user has obtained in the given category
function getPointsFromCategory(stats, category) {
    for (let i=0; i<stats.length; i++) {
        if (stats[i]["Category"] === category) {
            return stats[i]["Points"];
        }
    }
    return 0;
}

function addRatingStats(stats, categories, numOfPosts) {
    let table = `
        <caption>Statistics - ${numOfPosts} posts</caption>
        <thead>
            <tr>
                <th>Category</th>
                <th>Points</th>
            </tr>
        </thead>
        <tbody>
    `;
    for (let i=0; i<categories.length; i++) {
        table += `
            <tr>
                <td>${categories[i]["Name"]}</td>
                <td>${getPointsFromCategory(stats, categories[i]["Name"])}</td>
            </tr>
        `;
    }
    table += `</body>`;
    return table;
}

function addFriends(friends) {
    let list = `
        <div class="col-12 col-lg-8 d-flex justify-content-between">
            <h2>Friends</h2>
            <div>
                <a href="../php/friends.php?Username=${user}" class="d-flex justify-content-start" style="padding-top: 1%">
                <p style="font-size: 12px;">See all friends</p>
                <div>
                    <img src="../icons/goarrow_icon.png" alt="browse history">
                </div>
                </a>
            </div>
        </div>
        <div class="col-12 col-lg-8 d-flex justify-content-between">
    `;
    for (let i=0; i<Math.min(5, friends.length); i++) {
        list += `
            <div class="text-center">
                <a href="../php/userprofile.php?Username=${friends[i]["Username"]}">
                    <img src="../profile_pics/${friends[i]["ProfilePic"]}" alt="${friends[i]["Username"]} profile pic">
                    <p>${friends[i]["Name"]} ${friends[i]["Surname"]}</p>
                </a>
            </div>
        `;
    }
    list += `</div>`
    return list;
}

function manageFriendshipStatus(status, friendshipID, requested_user) {
    const div = document.getElementById("friendship-status");
    div.className = "d-flex justify-content-center";
    const p = document.createElement("p");
    if (status === "RECEIVED") {
        p.innerText = user + " has asked for your friendship!";
        div.appendChild(p);
        const accept = createAcceptFriendshipButton(friendshipID, user);
        accept.addEventListener('click', () => reload());
        div.appendChild(accept);
        const reject = createRejectFriendshipButton(friendshipID, user);
        reject.addEventListener('click', () => reload());
        div.appendChild(reject);
    } else if (status === "SENT") {
        p.innerText = "Your have asked " + user + " to become friends! Now you just need to wait for his approval.";
        div.appendChild(p);
    } else if (status === "FRIEND") {
        p.innerText = "You are friend with " + user;
        div.appendChild(p);
        const terminate = createTerminateFriendshipButton(friendshipID, requested_user);
        terminate.addEventListener('click', () => reload());
        div.appendChild(terminate);
    } else {
        const request = createRequestFriendshipButton(session_user, requested_user);
        request.addEventListener('click', () => reload());
        div.appendChild(request);
    }
}

function reload() {
    location.reload();
}

// adds a behavior to the elements of the settings menu in the profile page of the current user
let navItems = Array.from(document.getElementsByClassName("nav-item"));
navItems.forEach(item => item.addEventListener("click", () =>
    item.addEventListener("click", () => activeMenu(item))));

// if this script is part of the profile page, then this variable contains the name of the user currently logged in,
// otherwise it contains the name of the user searched by the user currently logged in.
const user = new URL(window.location.href).searchParams.get("Username") ?? session_user;

axios.get('../php/userprofile-api.php', {params: {Username: user}}).then(response => {
    const numberOfPosts = response.data["user-data"][0]["NumberOfPosts"];
    const numberOfFriends = response.data["user-data"][0]["NumberOfFriends"];
    const userData = createBasicInfo(response.data["user-data"][0]);
    const ratingStats = addRatingStats(response.data["rating-stats"], response.data["categories"], numberOfPosts);
    const friendsNum = `${numberOfFriends} friends`;
    const signupDate = `${response.data["user-data"][0]["SignupDate"]}`;
    const header = document.getElementById("user-data");
    const table = document.getElementById("rating-statistics");
    const friends_paragraph = document.getElementById("friends");
    const date_paragraph = document.getElementById("user-since");
    // add friendship status only in pages of users that are not the currently logged-in user.
    if (user !== session_user) {
        getFriendshipStatus(session_user, user).then(data =>
            manageFriendshipStatus(data["status"], data["friendshipID"], data["requested_user"]));
    }
    header.appendChild(userData);
    table.innerHTML += ratingStats;
    friends_paragraph.innerHTML = friendsNum;
    date_paragraph.innerHTML = signupDate;
    if (numberOfPosts !== 0) {
        const mostVotedPost = addMostVotedPost(response.data["most-voted-post"]);
        const main = document.getElementById("post");
        main.innerHTML += mostVotedPost;
    }
    if (numberOfFriends !== 0) {
        const friends = addFriends(response.data["friends"]);
        const friends_section = document.getElementById("friends-list");
        friends_section.innerHTML = friends;
    }
});