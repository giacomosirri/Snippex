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
        <div className="col-12 col-md-8 d-flex justify-content-between">
            <h2>
                Most voted post ever
            </h2>
            <div>
                <a href="posthistory.html" className="d-flex justify-content-start" style="padding-top: 1%;
                                text-decoration: none; color: black">
                    <p style="font-size: 12px;">Browse history</p>
                    <div>
                        <img src="../icons/goarrow_icon.png" alt="browse history">
                    </div>
                </a>
            </div>
        </div>
        <article id="most-voted-post" className="post col-12 col-md-8">
            <h3 className="post-title col-10">...</h3>
            <div className="d-flex justify-content-between">
                <div className="post-content col-12">
                    <input type="button" onClick="changeText(this)">
                        <p className="post-text">
                            ...
                        </p>
                    </input>
                    <p className="post-date col-12">...</p>
                </div>
                <div className="post-interactions d-flex justify-content-between flex-column">
                    <img className="rate-post" style="padding: 5px; border-radius: 20px;"
                         src="../icons/plus_icon.png" alt="post menu" onClick="showRatingCategories(0)"/>
                    <img className="thoughtfulness" style="display: none" src="../icons/thoughts_icon.png"
                         alt="rate as thoughtfulness" onClick="showPlus(0)">
                    <img className="idea" style="display: none" src="../icons/idea_icon.png"
                         alt="rate as idea" onClick="showPlus(0)">
                    <img className="advice" style="display: none" src="../icons/advice_icon.png"
                         alt="rate as advice" onClick="showPlus(0)">
                    <img className="laugh" style="display: none" src="../icons/laugh_icon.png"
                         alt="rate as humour" onClick="showPlus(0)">
                    <img className="comment-post" style="margin-bottom: 6px" src="../icons/comment_icon.png"
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
    const numberOfPosts = response.data["user-data"][0]["NumberOfPosts"];
    const userData = addBasicInfo(response.data["user-data"]);
    const ratingStats = addRatingStats(response.data["rating-stats"], response.data["categories"], numberOfPosts);
    const header = document.getElementById("user-data");
    const table = document.getElementById("rating-statistics");
    header.innerHTML += userData;
    table.innerHTML += ratingStats;
    if (numberOfPosts !== 0) {
        const mostVotedPost = addMostVotedPost(response.data["most-voted-post"]);
        const main = document.querySelector("main");
        main.innerHTML += mostVotedPost;
    }
});