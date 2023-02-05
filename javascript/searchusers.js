window.onload = () => {
    $("#username").keyup(function(){
        addProposal($("#username").val())
    });
    displayRecentSearch();
};

function deleteSearch(object){
    object.parentNode.style.display='none';
}

function addProposal(user) {
    if(user != null && user.length > 0){
        displayProposal();
    }else{
        displayRecentSearch();
    }
}

function displayProposal(){
    const user = document.querySelector("#username").value;
    return axios.get('../php/searchusers-api-proposal.php', {params: {Username: user}})
        .then(response => {
            document.getElementById("proposes").innerHTML="";
            return appendUsers(response.data.map(x => x.Username));
        });
}

function displayRecentSearch(){
    axios.get('../php/searchusers-api-recentsearch.php')
        .then(response => {
            console.log(response.data);
            document.getElementById("proposes").innerHTML="";
            if(response.data.length > 0) {
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
    col1.classList.add("col");
    col2.classList.add("col");
    col1.innerHTML+=
        `<img src="../profile_pics/${user}.png" alt="profile pic">`;
    col2.innerHTML+=`
                <div>${user}</div>
                <div>post:${numberOfPosts}</div>`;
    for (let i=0; i<categories.length; i++) {
        col2.innerHTML+=`<div>${categories[i]["Name"]}:${getPointsFromCategory(ratingStats, categories[i]["Name"])}</div>`;
    }

    row.appendChild(col1);
    row.appendChild(col2);
    container.appendChild(row);

    if (user !== session_user) {
        getFriendshipStatus(session_user, user).then(data =>
            row.appendChild(manageFriendshipStatus(data["status"], data["friendshipID"], data["requested_user"])));
    }else{
        let col = document.createElement("div");
        col.classList.add("col");
        row.appendChild(col);
    }
    row.style.marginBottom = '50px';

    row.querySelector("img").addEventListener('click', () => {
        addRecentUser(user);
        window.location.replace("./userprofile.php?Username="+user);
        //change page
    })
    document.getElementById("proposes").appendChild(container);
}

function manageFriendshipStatus(status, friendshipID, requested_user) {
    const div = document.createElement("div");
    div.classList.add("friendship-status");
    div.className = "col";
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
        div.appendChild(createRequestFriendshipButton(requested_user));
    }
    return div;
}

function appendUsers(users){
    const usersWithoutDuplicate = new Set(users)
    usersWithoutDuplicate.forEach(x => appendUser(x));
}

function addRecentUser(user){
    axios.get('../php/searchusers-api-recentsearch.php', {params:{Username:user}});
}
