function timeOfFriendship(date) {
    const today = new Date();
    const full_date = new Date(date);
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(full_date.getFullYear(), full_date.getMonth(), full_date.getDate());
    const utc2 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    return Math.floor((utc2 - utc1) / MS_PER_DAY);
}

function reload() {
    location.reload();
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
            <div class="col-7">
                <p><strong>${data["Name"]} ${data["Surname"]}</strong></p>
                <p>~${data["Username"]}</p>
                <p>You have been friends for ${friendsFor} days</p>
            </div>
        </div>
    `;
    const img = friend.querySelector("img");
    getUserProfilePic(data["Username"]).then(image => img.src = image);
    const button_div = document.createElement("div");
    button_div.className = "col-2";
    const button = createTerminateFriendshipButton(data["FriendshipID"], data["Username"]);
    button.addEventListener("click", () => reload());
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

window.addEventListener("resize", () => adaptFriendsSizeToDisplay());

axios.get('../php/friends-api.php', {params: {Username: user}}).then(response => {
    const friends = response.data["current"];
    for (let i=0; i<friends.length; i++) {
        section.appendChild(addFriend(friends[i]));
    }
    const h1 = document.querySelector("header h1");
    h1.innerHTML = "All " + user + "'s friends (" + friends.length + ")";
    adaptFriendsSizeToDisplay();
});
