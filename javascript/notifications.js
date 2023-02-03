async function markNotificationAsRead(notificationID) {
    await axios.put('../php/notifications-api.php', {ID: notificationID, Type: "update"});
    location.reload();
}

function addNotifications(notifications) {
    const section = document.getElementById("all-notifications");
    for (let i=0; i<notifications.length; i++) {
        section.appendChild(notifications[i]);
    }
}

function countNotifications(data) {
    let notifications = 0;
    Object.keys(data).forEach(i => notifications += data[i].length);
    return notifications;
}

function addNotificationMainContent(data, type) {
    const content = document.createElement("a");
    content.href = "../php/comments.php?PostID=" + `${data["PostID"]}`;
    content.className = "col-5 col-xl-5 notification-content";
    content.style.fontSize = "15px";
    content.style.wordSpacing = "1px";
    if (type === "comment") {
        content.innerHTML = `<strong>~${data["User"]}</strong> has commented your post <em>${data["PostTitle"]}</em>`;
    } else if (type === "rating") {
        content.innerHTML = `<strong>~${data["Rater"]}</strong> has rated your post <em>${data["PostTitle"]}</em> with <em>${data["Category"]}</em>`;
    } else {
        content.innerHTML = `${data["User"]} has requested to become your friend`;
    }
    return content;
}

function addDate(data) {
    const date = document.createElement("p");
    date.className = "col-5 col-xl-3 align-self-center notification-date";
    date.style.fontSize = "80%";
    date.style.color = "#6e6e6e";
    date.innerHTML = `${data["DateAndTime"]}`;
    return date;
}

function addDeleteNotification(id) {
    const bin = document.createElement("div");
    bin.className = "col-1 d-flex justify-content-start";
    bin.style.marginLeft = "15px";
    const button = document.createElement("button");
    button.addEventListener("click", () => markNotificationAsRead(id));
    bin.appendChild(button);
    const icon = document.createElement("img");
    icon.className = "delete-notification";
    icon.src = "../icons/bin_icon.png";
    icon.alt = "delete-notification";
    button.appendChild(icon);
    return bin;
}

function addAcceptButton() {
    const accept = document.createElement("button");
    accept.className = "btn-primary";
    accept.innerHTML = `Accept request`;
    return accept;
}

function addRejectButton() {
    const accept = document.createElement("button");
    accept.className = "btn-danger";
    accept.innerHTML = `Reject request`;
    return accept;
}

function createNotification(data, type) {
    const notification = document.createElement("div");
    notification.className = "notification row align-items-center";
    notification.id = "notification-" + data["NotificationID"];
    const left_space = document.createElement("div");
    left_space.className = "col-md-1";
    notification.appendChild(left_space);
    notification.appendChild(addNotificationMainContent(data, type));
    notification.appendChild(addDate(data));
    if (type === "friendship") {
        notification.appendChild(addAcceptButton());
        notification.appendChild(addRejectButton());
    }
    notification.appendChild(addDeleteNotification(data["NotificationID"]));
    return notification;
}

axios.get('../php/notifications-api.php').then(response => {
    const h1 = document.querySelector("header h1");
    const n = countNotifications(response.data);
    h1.innerHTML = `You have ${n} notifications to read`;
    const notifications = [];
    response.data["comments"].forEach(elem => notifications.push(createNotification(elem, "comment")));
    response.data["ratings"].forEach(elem => notifications.push(createNotification(elem, "rating")));
    response.data["friendships"].forEach(elem => notifications.push(createNotification(elem, "friendship")));
    addNotifications(notifications);
});