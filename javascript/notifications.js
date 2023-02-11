async function markNotificationAsRead(notificationID) {
    await axios.put('../php/notifications-api.php', {ID: notificationID});
}

function addNotifications(notifications) {
    const section = document.getElementById("all-notifications");
    for (let i=0; i<notifications.length; i++) {
        section.appendChild(notifications[i]);
    }
}

function countNotifications(data) {
    return data["comments"].length + data["ratings"].length;
}

function countFriendshipRequests(data) {
    return data["friendships"].length;
}

function addNotificationMainContent(data, type) {
    const content = document.createElement("a");
    if (type === "comment" || type === "rating") {
        content.href = "../php/comments.php?PostID=" + `${data["PostID"]}`;
    }
    content.className = "col-6 notification-content";
    if (type === "comment") {
        content.classList.add("comment");
        content.innerHTML = `<strong>~${data["User"]}</strong> has commented your post <em>${data["PostTitle"]}</em>`;
    } else if (type === "rating") {
        content.classList.add("rating");
        content.innerHTML = `<strong>~${data["Rater"]}</strong> has rated your post <em>${data["PostTitle"]}</em> with <em>${data["Category"]}</em>`;
    } else {
        content.classList.add("request");
        content.innerHTML = `<strong>~${data["Username"]}</strong> has requested to become your friend`;
    }
    return content;
}

function addDate(data) {
    const date = document.createElement("p");
    date.className = "col-4 notification-date";
    date.innerHTML = `${data["DateAndTime"]}`;
    return date;
}

function createDeleteNotificationButton(id) {
    const bin = document.createElement("div");
    bin.className = "col-1 d-flex justify-content-start";
    const button = document.createElement("button");
    button.className = "btn btn-outline-danger delete-one";
    button.addEventListener("click", () => markNotificationAsRead(id).then(() => location.reload()));
    bin.appendChild(button);
    const icon = document.createElement("img");
    icon.className = "delete-notification";
    icon.src = "../icons/bin_icon.png";
    icon.alt = "delete-notification";
    button.appendChild(icon);
    return bin;
}

function createDeleteAllNotificationsButton(notifications) {
    const header = document.querySelector("header");
    const div = document.getElementById("delete-all-div");
    const button = document.createElement("button");
    button.id = "delete-all";
    button.className = "btn btn-outline-danger";
    button.innerText = "Delete all";
    button.addEventListener("click", () => {
        notifications.forEach(notification => markNotificationAsRead(notification.id.split("-")[1]))
        location.reload();
    });
    div.appendChild(button);
    header.appendChild(div);
}

function createNotification(data, type) {
    const notification = document.createElement("div");
    notification.className = "notification row";
    notification.id = "notification-" + data["NotificationID"];
    notification.appendChild(addNotificationMainContent(data, type));
    if (type === "friendship") {
        const div = document.createElement("div");
        div.className = "col-6";
        const accept = createAcceptFriendshipButton(data["FriendshipID"], data["Username"]);
        accept.addEventListener('click', () => reload());
        div.appendChild(accept);
        const reject = createRejectFriendshipButton(data["FriendshipID"], data["Username"]);
        reject.addEventListener('click', () => reload());
        div.appendChild(reject);
        notification.appendChild(div);
    } else {
        notification.appendChild(addDate(data));
        notification.appendChild(createDeleteNotificationButton(data["NotificationID"]));
    }
    return notification;
}

function reload() {
    location.reload();
}

axios.get('../php/notifications-api.php').then(response => {
    const h1 = document.querySelector("header h1");
    const n = countNotifications(response.data);
    const m = countFriendshipRequests(response.data);
    h1.innerHTML = `You have ${n} notifications to read and ${m} friendship requests`;
    const notifications = [];
    response.data["comments"].forEach(elem => notifications.push(createNotification(elem, "comment")));
    response.data["ratings"].forEach(elem => notifications.push(createNotification(elem, "rating")));
    response.data["friendships"].forEach(elem => notifications.push(createNotification(elem, "friendship")));
    addNotifications(notifications);
    if (countNotifications(response.data) > 0) {
        createDeleteAllNotificationsButton(notifications);
    }
});