function addBasicInfo(data) {
    return `
        <div class="col-10 d-flex justify-content-center">
            <div class="d-flex justify-content-start flex-column">
                <h1 style="color: black">${data[0]["Name"]} ${data[0]["Surname"]}</h1>
                <h2 style="color: black; font-size: 18px; margin-top: -14px">~${data[0]["Username"]}</h2>
                <div style="margin-bottom: 5px">
                    <img id="profile-pic" src="../profile_pics/${data[0]["ProfilePic"]}" alt="profile pic"/>
                </div>
            </div>
            <div class="col-1"></div>
        </div>
    `;
}

function addMostVotedPost(data) {
    return `
        <div class="col-12 col-md-8 d-flex justify-content-between">
            <h2>
                Most voted post ever
            </h2>
            <div>
                <a href="/html/posthistory.html" class="d-flex justify-content-start" style="padding-top: 1%;
                                text-decoration: none; color: black">
                    <p style="font-size: 12px;">Browse history</p>
                    <div>
                        <img src="../icons/goarrow_icon.png" alt="browse history">
                    </div>
                </a>
            </div>
        </div>
        <article id="most-voted-post" class="post col-12 col-md-8">
            <h3 class="post-title col-10">${data[0]["Title"]}</h3>
            <div class="d-flex justify-content-between">
                <div class="post-content col-12">
                    <input type="button" onClick="changeText(this)">
                        <p class="post-text">
                            ${data[0]["Content"]}
                        </p>
                    </input>
                    <p class="post-date col-12">${data[0]["DateAndTime"]}</p>
                </div>
                <div class="post-interactions d-flex justify-content-between flex-column">
                    <img class="rate-post" style="padding: 5px; border-radius: 20px;"
                         src="../icons/plus_icon.png" alt="post menu" onClick="showRatingCategories(0)"/>
                    <img class="thoughtfulness" style="display: none" src="../icons/thoughts_icon.png"
                         alt="rate as thoughtfulness" onClick="showPlus(0)">
                    <img class="idea" style="display: none" src="../icons/idea_icon.png"
                         alt="rate as idea" onClick="showPlus(0)">
                    <img class="advice" style="display: none" src="../icons/advice_icon.png"
                         alt="rate as advice" onClick="showPlus(0)">
                    <img class="laugh" style="display: none" src="../icons/laugh_icon.png"
                         alt="rate as humour" onClick="showPlus(0)">
                    <img class="comment-post" style="margin-bottom: 6px" src="../icons/comment_icon.png"
                         alt="comment">
                </div>
            </div>
        </article>
    `;
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
    let list = ``;
    for (let i=0; i<5; i++) {
        list += `
            <div class="text-center">
                <a href="#">
                    <img src="../profile_pics/${friends[i]["ProfilePic"]}" alt="${friends[i]["Username"]} profile pic">
                    <p>${friends[i]["Name"]} ${friends[i]["Surname"]}</p>
                </a>
            </div>
        `;
    }
    return list;
}

axios.get('../php/userprofile-api.php').then(response => {
    console.log(response.data);
    const numberOfPosts = response.data["user-data"][0]["NumberOfPosts"];
    const userData = addBasicInfo(response.data["user-data"]);
    const ratingStats = addRatingStats(response.data["rating-stats"], response.data["categories"], numberOfPosts);
    const friendsNum = `${response.data["user-data"][0]["NumberOfFriends"]} friends`;
    const signupDate = `${response.data["user-data"][0]["SignupDate"]}`;
    const friends = addFriends(response.data["friends"]);
    const header = document.getElementById("user-data");
    const table = document.getElementById("rating-statistics");
    const friends_paragraph = document.getElementById("friends");
    const date_paragraph = document.getElementById("user-since");
    const friends_div = document.getElementById("list-friends");
    header.innerHTML += userData;
    table.innerHTML += ratingStats;
    friends_paragraph.innerHTML = friendsNum;
    date_paragraph.innerHTML = signupDate;
    friends_div.innerHTML = friends;
    if (numberOfPosts !== 0) {
        const mostVotedPost = addMostVotedPost(response.data["most-voted-post"]);
        const main = document.querySelector("main");
        main.innerHTML += mostVotedPost;
    }
});