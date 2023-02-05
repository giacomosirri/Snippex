import { createNewPost } from "./commons.js";

const url_string = window.location.href;
const url = new URL(url_string);
const keyword = url.searchParams.get("keyword");
const explore = document.getElementById("explore-posts");

$("#keyword-search").on("keyup", function(event) {
    updateSearch($(this).val());
});

function updateSearch(text) {
    if (text != null && text.length > 0) {
        displaySearch(text);
    } else {
        axios.get('../php/explore-api.php').then(response => {
            explore.innerHTML="";
            for (let i = 0; i < response.data.length; i++) {
                explore.appendChild(createNewPost(response.data[i], i));
            }
        });
    }
}

function displaySearch(text) {
    axios.get('../php/explore-api-search.php', {params: {keyword: text}}).then(response => {
        explore.innerHTML="";
        for (let i=0; i<response.data.length; i++) {
            explore.appendChild(createNewPost(response.data[i], i));
        }
    });
}

axios.get('../php/explore-api.php').then(response => {
    explore.innerHTML="";
    for (let i = 0; i < response.data.length; i++) {
        explore.appendChild(createNewPost(response.data[i], i));
    }
});