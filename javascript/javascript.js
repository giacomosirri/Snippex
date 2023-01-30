window.onload = function() {
    document.querySelectorAll("article label").forEach(label => changeText(label));
}

function activeLogin(link) {
    const links = document.querySelectorAll("nav .nav-link");
    links.forEach(item => item.classList.remove("active"));
    links.forEach(item => item.style.fontWeight="normal");
    link.classList.add("active");
    link.style.fontWeight="bold";
}

function activeMenu(link) {
    const menu = document.querySelectorAll("header nav ul li a");
    menu.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
}
function createPost(){
        let title = document.querySelector("#recipient-title").value;
        let content = document.querySelector("#message-text").value;
        let close = document.querySelector("#close");
        let date = new Date();
        console.log(title);
        console.log(content);
        console.log(date);
        close.click();
}

function changeText(label) {
    let paragraph = label.querySelector('p');
    if (paragraph.style.webkitLineClamp === "4") {
        paragraph.style.webkitLineClamp = "unset";
    } else {
        paragraph.style.webkitLineClamp = "4";
    }
}

function showRatingCategories(button) {
    const div = button.parentElement;
    const icons = div.children;
    for (let i=0; i<icons.length; i++) {
        if(icons[i].className==="rate-post") {
            icons[i].style.display = "none";
        } else {
            icons[i].style.display = "inline";
        }
    }
}

function showPlus(button) {
    const div = button.parentElement;
    const icons = div.children;
    for (let i=0; i<icons.length-1; i++) {
        if(icons[i].className==="rate-post" || icons[i].className==="comment-post") {
            icons[i].style.display = "inline";
        } else {
            icons[i].style.display = "none";
        }
    }
    showUsername(button.parentElement.parentElement.parentElement);
}

function showComments(postId) {
    console.log(postId);
    window.open("comments.php?PostID=" + postId.innerText, "_self");
    console.log(postId.innerText);
}

function goBack() {
    window.history.back();
}

function setMenuVisibility() {
    const menu = document.getElementById("options-menu");
    if (menu.style.display === "none") {
        menu.style.display = "inline";
    } else {
        menu.style.display = "none";
    }
}

function showUsername(post) {
    const username = post.querySelector("#user-username").innerText;
    const postTitle = post.querySelector("#post-header");
    postTitle.innerText = postTitle.innerText.split(" ~ ")[0] + " ~ " + username;
}
