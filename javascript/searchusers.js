window.onload = () => {
    $("#username").keyup(function() {
        addProposal($("#username").val());
    });
    if(sessionStorage["username"]) {
        document.getElementById("username").value = window.sessionStorage.getItem("username");
    }
    addProposal(document.getElementById("username").value);
    sessionStorage.removeItem("username");
};

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
    return axios.get('../php/searchusers-api-proposal.php', {params: {Username: user}})
        .then(response => {
            document.getElementById("proposes").innerHTML="";
            return appendUsers(response.data.map(x => x.Username));
        });
}

function displayRecentSearch() {
    const h3 = document.querySelector("h3");
    h3.innerText = "Recent searches:"
    axios.get('../php/searchusers-api-recentsearch.php')
        .then(response => {
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

function appendUser(user){
    axios.get('../php/userprofile-api.php', {params: {Username: user}}).then(response => {
        const numberOfPosts = response.data["user-data"][0]["NumberOfPosts"];
        const numberOfFriends = response.data["user-data"][0]["NumberOfFriends"];
        const ratingStats = response.data["rating-stats"];
        const categories = response.data["categories"];
        return simpleAppendUser(user, numberOfPosts, numberOfFriends, ratingStats, categories);
    });
}

function simpleAppendUser(user, numberOfPosts, numberOfFriend, ratingStats, categories){
    let container = document.createElement("div");
    let row = document.createElement("div");
    let col1 = document.createElement("div");
    let col2 = document.createElement("div");
    container.classList.add("container");
    row.classList.add("row");
    col1.classList.add("col-4");
    col2.classList.add("col-5");
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
    });
    col2.innerHTML += `
        <div><strong>~${user}</strong></div>
        <div>posts: ${numberOfPosts}</div>
    `;
    for (let i=0; i<categories.length; i++) {
        col2.innerHTML+=`<div>${categories[i]["Name"]}: ${getPointsFromCategory(ratingStats, categories[i]["Name"])}</div>`;
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
            col.classList.add("col-3");
            row.appendChild(col);
        }
    }, 150);
    row.style.marginBottom = '50px';
    document.getElementById("proposes").appendChild(container);
}

function manageFriendshipStatus(status, friendshipID, requested_user) {
    const div = document.createElement("div");
    div.classList.add("friendship-status");
    div.className = "col-3";
    const p = document.createElement("p");
    div.innerHTML = "";
    if (status === "RECEIVED") {
        p.innerText = requested_user + " has asked for your friendship!";
        div.appendChild(p);
        div.appendChild(createAcceptFriendshipButton(friendshipID));
        div.appendChild(createRejectFriendshipButton(friendshipID));
    } else if (status === "SENT") {
        p.innerText = "Your have asked " + requested_user + " to become friends! Now you just need to wait for his approval.";
        div.appendChild(p);
    } else if (status === "FRIEND") {
        p.innerText = "You are friend with " + requested_user;
        div.appendChild(p);
    } else {
        let button = createRequestFriendshipButton(requested_user);
        button.addEventListener("click", ()=>{
            window.sessionStorage.setItem("username", document.getElementById("username").value);
            location.reload();
        })
        div.appendChild(button);
    }
    return div;
}

function appendUsers(users){
    const usersWithoutDuplicate = new Set(users);
    usersWithoutDuplicate.forEach(x => appendUser(x));
}

function addRecentUser(user){
    axios.get('../php/searchusers-api-recentsearch.php', {params:{Username:user}});
}
