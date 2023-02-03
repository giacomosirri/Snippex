import {createNewPost} from "./commons.js";

function activeMenu(link) {
    const menu = document.querySelectorAll("header nav ul li a");
    menu.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
}

function addBasicInfo(data) {
    return `
        <div class="d-flex justify-content-start flex-column">
            <h1 style="color: black">${data[0]["Name"]} ${data[0]["Surname"]}</h1>
            <h2 style="color: black; font-size: 18px; margin-top: -14px">~${data[0]["Username"]}</h2>
            <div style="margin-bottom: 5px">
                <img id="main-profile-pic" src="../profile_pics/${data[0]["ProfilePic"] ?? "unknown-man.png"}" alt="profile pic"/>
            </div>
        </div>
    `;
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
    const post = createNewPost(data[0], 0);
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

function isFriend() {
    return axios.get('../php/friends-api.php', {params: {Username: user}}).then(response => {
        for (let i=0; i<response.data.length; i++) {
            if (response.data[i]["Username"] === session_user) {
                return true;
            }
        }
        return false;
    });
}

function addRequestFriendshipButton(friend) {
    if (!friend) {
        const friendship_div = document.getElementById("friendship");
        const button = document.createElement("button");
        button.className = "btn btn-primary";
        button.innerText = "Request friendship";
        button.addEventListener("click", () => friendshipRequest(session_user, user));
        friendship_div.appendChild(button);
    }
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
    const userData = addBasicInfo(response.data["user-data"]);
    const ratingStats = addRatingStats(response.data["rating-stats"], response.data["categories"], numberOfPosts);
    const friendsNum = `${numberOfFriends} friends`;
    const signupDate = `${response.data["user-data"][0]["SignupDate"]}`;
    const header = document.getElementById("user-data");
    const table = document.getElementById("rating-statistics");
    const friends_paragraph = document.getElementById("friends");
    const date_paragraph = document.getElementById("user-since");
    // add request button only in the profile pages of users the current user is not yet friend with
    if (document.getElementById("friendship") !== null) {
        isFriend().then(friend => addRequestFriendshipButton(friend));
    }
    header.innerHTML += userData;
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