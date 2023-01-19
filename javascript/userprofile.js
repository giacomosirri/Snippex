function addBasicInfo(data) {
    console.log(data);
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
    console.log(data);
    return `
        <h3 class="post-title col-10">...</h3>
        <div class="d-flex justify-content-between">
            <div class="post-content col-12">
                <input type="button" onclick="changeText(this)">
                    <p class="post-text">
                        ...
                    </p>
                </input>
                <p class="post-date col-12">...</p>
            </div>
            <div class="post-interactions d-flex justify-content-between flex-column">
                <img class="rate-post" style="padding: 5px; border-radius: 20px;"
                    src="../icons/plus_icon.png" alt="post menu" onclick="showRatingCategories(0)"/>
                <img class="thoughtfulness" style="display: none" src="../icons/thoughts_icon.png"
                    alt="rate as thoughtfulness" onclick="showPlus(0)">
                <img class="idea" style="display: none" src="../icons/idea_icon.png"
                    alt="rate as idea" onclick="showPlus(0)">
                <img class="advice" style="display: none" src="../icons/advice_icon.png"
                    alt="rate as advice" onclick="showPlus(0)">
                <img class="laugh" style="display: none" src="../icons/laugh_icon.png"
                    alt="rate as humour" onclick="showPlus(0)">
                <img class="comment-post" style="margin-bottom: 6px" src="../icons/comment_icon.png" alt="comment">
            </div>
        </div>
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
    console.log(stats);
    console.log(categories);
    console.log(numOfPosts);
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

axios.get('../php/userprofile-api.php').then(response => {
    console.log(response.data);
    const userData = addBasicInfo(response.data["user-data"]);
    const mostVotedPost = addMostVotedPost(response.data["most-voted-post"]);
    const ratingStats = addRatingStats(response.data["rating-stats"], response.data["categories"],
            response.data["user-data"][0]["NumberOfPosts"]);
    const header = document.getElementById("user-data");
    const article = document.getElementById("most-voted-post");
    const table = document.getElementById("rating-statistics");
    header.innerHTML += userData;
    article.innerHTML += mostVotedPost;
    table.innerHTML += ratingStats;
});