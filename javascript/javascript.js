window.onload = function() {
    document.querySelectorAll("article label").forEach(label => changeText(label));
}

function activeMenu() {
    const menu = document.querySelectorAll("header nav ul li");
    menu.forEach(item => item.classList.remove("active"));
    this.classList.add("active");
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

function showRatingCategories(index) {
    const div = document.getElementsByClassName("post-interactions")[index];
    const icons = div.children;
    for (let i=0; i<icons.length; i++) {
        if(icons[i].className==="rate-post") {
            icons[i].style.display = "none";
        } else {
            icons[i].style.display = "inline";
        }
    }
}

function showPlus(index) {
    const div = document.getElementsByClassName("post-interactions")[index];
    const icons = div.children;
    for (let i=0; i<icons.length; i++) {
        if(icons[i].className==="rate-post" || icons[i].className==="comment-post") {
            icons[i].style.display = "inline";
        } else {
            icons[i].style.display = "none";
        }
    }
}

function setMenuVisibility() {
    const menu = document.getElementById("options-menu");
    if (menu.style.display === "none") {
        menu.style.display = "inline";
    } else {
        menu.style.display = "none";
    }
}