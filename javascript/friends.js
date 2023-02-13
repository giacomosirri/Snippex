function timeOfFriendship(date) {
    const today = new Date();
    const full_date = new Date(date);
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(full_date.getFullYear(), full_date.getMonth(), full_date.getDate());
    const utc2 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    return Math.floor((utc2 - utc1) / MS_PER_DAY);
}

function adaptButtonsSizeToDisplay() {
    const buttons = document.querySelector("main button");
    for (let i=0; i<buttons.length; i++) {
        if (window.innerWidth < desktopSize) {
            buttons[i].innerText = "Unfriend";
        } else {
            buttons[i].innerText = "End friendship";
        }
    }
}

function addFriend(data) {
    const friendsFor = timeOfFriendship(data["FriendsSince"]);
    const friend = document.createElement("div");
    friend.innerHTML = `
        <div class="row friend">
            <div class="col-${col} d-flex justify-content-center">
                <a href="../php/userprofile.php?Username=${data["Username"]}">
                    <img class="selected-users-profile-pics" src="" alt="profile pic"/>
                </a>
            </div>
            <div class="col-6">
                <p class="name"><strong>${data["Name"]} ${data["Surname"]}</strong></p>
                <p class="username">~${data["Username"]}</p>
                <p class="time">You have been friends for ${friendsFor} days</p>
            </div>
        </div>
    `;
    const img = friend.querySelector("img");
    getUserProfilePic(data["Username"]).then(image => img.src = image);
    const button_div = document.createElement("div");
    button_div.className = "col-3";
    const button = createTerminateFriendshipButton(data["FriendshipID"], data["Username"]);
    if (window.innerWidth < desktopSize) {
        button.innerText = "Unfriend";
    }
    button_div.appendChild(button);
    const row = friend.children.item(0);
    row.appendChild(button_div);
    return friend;
}

function calculateImageMaxWidth() {
    // actual width is the full screen width minus the padding and the margins of the images
    const main_margins = (window.innerWidth > desktopSize) ? 0.60 : 1;
    const actualWidth = window.innerWidth * (main_margins-padding) * (col/12) - 20;
    return Math.floor(actualWidth);
}

function adaptFriendsSizeToDisplay() {
    const all_friends = document.getElementsByClassName("friend");
    for (let i=0; i<all_friends.length; i++) {
        const img = all_friends[i].querySelector("img");
        img.style.maxWidth = calculateImageMaxWidth() + "px";
    }
}

const url_string = window.location.href;
const url = new URL(url_string);
const user = url.searchParams.get("Username");
const section = document.getElementById("friends");
const padding = 0.03;
const desktopSize = 1025;
const col = 3;

window.addEventListener("resize", () => {
    adaptFriendsSizeToDisplay();
    adaptButtonsSizeToDisplay();
});

axios.get('../php/friends-api.php', {params: {Username: user}}).then(response => {
    const friends = response.data["current"];
    for (let i=0; i<friends.length; i++) {
        section.appendChild(addFriend(friends[i]));
    }
    const h3 = document.querySelector("header h3");
    h3.innerHTML = "All " + user + "'s friends (" + friends.length + ")";
    adaptFriendsSizeToDisplay();
});
