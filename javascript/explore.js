import { createNewPost } from "./commons.js";

const url_string = window.location.href;
const url = new URL(url_string);
const keyword = url.searchParams.get("keyword");
const explore = document.getElementById("explore-posts");

document.addEventListener("keyup", function(event) {
    let search = $("#keyword-search").val();
    if (event.key === "Enter" && search != null && search.length > 0) {
        console.log("Search: " + search);
        window.open("./explore.php?keyword=" + search, "_self");
    }
});



if (keyword != null) {
    axios.get('../php/explore-api.php', {params: {keyword: keyword}}).then(response => {
        for (let i=0; i<response.data.length; i++) {
            explore.appendChild(createNewPost(response.data[i], i));
        }
    });
} else {
    axios.get('../php/explore-api.php').then(response => {
    for (let i = 0; i < response.data.length; i++) {
        explore.appendChild(createNewPost(response.data[i], i));
    }
    });
}