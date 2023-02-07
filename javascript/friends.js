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
        <div class="row">
                <div class="col-2 align-self-stretch">
                <a href="../php/userprofile.php?Username=${data["Username"]}">
                    <img src="../profile_pics/${data["ProfilePic"]}" alt="profile pic" style="width: 100%"/>
                </a>
            </div>
            <div class="col-10 d-flex align-items-center">
                <p><strong>${data["Name"]} ${data["Surname"]}</strong></p>
                <p>~${data["Username"]}</p>
                <p>You have been friends for ${friendsFor} days</p>
            </div>
        </div>
    `;
    const button = createTerminateFriendshipButton(data["FriendshipID"], data["Username"]);
    button.addEventListener("click", () => reload());
    friend.appendChild(button);
    return friend;
}

const url_string = window.location.href;
const url = new URL(url_string);
const user = url.searchParams.get("Username");
const section = document.getElementById("friends");

axios.get('../php/friends-api.php', {params: {Username: user}}).then(response => {
    const friends = response.data["current"];
    for (let i=0; i<friends.length; i++) {
        section.appendChild(addFriend(friends[i]));
    }
    const h1 = document.querySelector("header h1");
    h1.innerHTML = user + "'s friends";
});