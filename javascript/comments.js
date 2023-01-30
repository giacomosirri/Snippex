const url_string = window.location.href;
const url = new URL(url_string);
const comments = document.getElementById("comments");

function createNewComment(data) {
    const comment = document.createElement("article");
    comment.class = "comment col-12 col-md-8 mx-auto";
    comment.innerHTML = `
    <article className="comment col-12 col-md-8 mx-auto">
        <h3 className="post-title col-10">~ ${data["User"]}</h3>
        <div className="d-flex justify-content-between">
            <div className="post-content col-12">
                <label role="button" onClick="changeText(this)">
                    <p className="post-text">
                        ${data["Content"]}
                    </p>
                </label>
                <p className="post-date col-12">${data["DateAndTime"]}</p>
            </div>
        </div>
    </article>`;
    return comment;
}

axios.get('../php/comments-api.php', {params: {PostID: url.searchParams.get("PostID")}}).then(response => {
   for (let i=0; i<response.data.length; i++) {
         comments.appendChild(createNewComment(response.data[i]));
   }
});