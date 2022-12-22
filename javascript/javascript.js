function changeText(label) {
    let paragraph = label.querySelector('p');
    let checkbox = label.previousElementSibling;
    if(checkbox.checked) {
        paragraph.style.webkitLineClamp = "4";
    } else {
        paragraph.style.webkitLineClamp = "unset";
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