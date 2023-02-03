function addFriend(data) {
    const friend = document.createElement("div");
    friend.className = "row";
    friend.innerHTML = `
        <div class="col-2 col-lg-1">
            <a href="../php/userprofile.php?Username=${data["Username"]}">
                <img src="../profile_pics/${data["ProfilePic"]}" 
                    alt="profile pic" style="height: auto; width: auto; max-width: 90px; max-height: 90px;"/>
            </a>
        </div>
        <div class="col-10 col-lg-2 d-flex justify-content-center flex-column">
            <p>${data["Name"]} ${data["Surname"]}</p>
        </div>
    `;
    return friend;
}

const url_string = window.location.href;
const url = new URL(url_string);
const user = url.searchParams.get("Username");

axios.get('../php/friends-api.php', {params: {Username: user}}).then(response => {
    const section = document.getElementById("friends");
    const friends = response.data;
    for (let i=0; i<friends.length; i++) {
        section.appendChild(addFriend(friends[i]));
    }
    const h1 = document.querySelector("header h1");
    h1.innerHTML = user + "'s friends";
});