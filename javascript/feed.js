import { createNewPost } from "./commons.js";

const url_string = window.location.href;
const url = new URL(url_string);
const user = url.searchParams.get("Username");
const feed = document.getElementById("feed-posts");
const desktop_size = 1025;
window.addEventListener("resize", () => desktopVisualization());
desktopVisualization();

async function getNotificationIcon() {
    console.log("ciao");
    return axios.get('../php/notifications-api.php').then(response => {
        if (response.data.length === 0) {
            return "../icons/notification_icon.png";
        } else {
            return "../icons/ringing_icon.png";
        }
    });
}

function desktopVisualization() {
    if (window.innerWidth < desktop_size) {
        const header = document.querySelector("header");
        if (document.getElementById("bell") === null) {
            const a = document.createElement("a");
            a.href = "../php/notifications.php";
            const img = document.createElement("img");
            img.id = "bell";
            getNotificationIcon().then(image => img.src = image);
            a.appendChild(img);
            header.appendChild(a);
        }
    }
}

axios.get('../php/feed-api.php', {params: {Username: user}}).then(response => {
    for (let i=0; i<response.data.length; i++) {
        feed.appendChild(createNewPost(response.data[i]));
    }
});
