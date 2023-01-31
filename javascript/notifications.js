function markNotificationAsRead(notificationID) {
    console.log(notificationID);
    axios.put('../php/notifications.php', { NotificationID: notificationID });
}

function createCommentNotification(data) {
    return `
        <div class="notification row align-items-center">
            <div class="col-md-1"></div>
            <p class="col-5 col-xl-5 notification-content" style="font-size: 15px">
                ${data["User"]} has commented your post ''
            </p>
            <p class="col-3 col-xl-2 align-self-center notification-date" style="font-size: 80%; color:#6e6e6e">
                ${data["DateAndTime"]}
            </p>
            <button class="btn btn-outline-primary btn-sm col-2 col-xl-1 action" style="font-size: 12px">
                See comment
            </button>
            <div class="col-1 d-flex justify-content-start" style="margin-left: 15px" onclick="markNotificationAsRead(${data["NotificationID"]})">
                <img class="delete-notification" src="../icons/bin_icon.png" alt="delete notification"/>               
            </div>
        </div>
    `;
}

function createRatingNotification(data) {
    return `
        <div class="notification row align-items-center">
            <div class="col-md-1"></div>
            <p class="col-5 col-xl-5 notification-content" style="font-size: 15px">
                ${data["Rater"]} has rated your post
            </p>
            <p class="col-3 col-xl-2 align-self-center notification-date" style="font-size: 80%; color:#6e6e6e">
                ${data["DateAndTime"]}
            </p>
            <div class="col-1 d-flex justify-content-start" style="margin-left: 15px" onclick="markNotificationAsRead(${data["NotificationID"]})">
                <img class="delete-notification" src="../icons/bin_icon.png" alt="delete notification"/>               
            </div>
        </div>
    `;
}

function createFriendNotification(data) {
    return `
        <div class="notification row align-items-center">
            <div class="col-md-1"></div>
            <p class="col-5 col-xl-5 notification-content" style="font-size: 15px">
                ${data["User"]} has requested to become your friend
            </p>
            <p class="col-3 col-xl-2 align-self-center notification-date" style="font-size: 80%; color:#6e6e6e">
                ${data["DateAndTime"]}
            </p>
            <button class="btn btn-outline-primary btn-sm col-2 col-xl-1 action" style="font-size: 12px">
                Accept friendship
            </button>
            <button class="btn btn-outline-primary btn-sm col-2 col-xl-1 action" style="font-size: 12px">
                Request friendship
            </button>
            <div class="col-1 d-flex justify-content-start" style="margin-left: 15px" onclick="markNotificationAsRead(${data["NotificationID"]})">
                <img class="delete-notification" src="../icons/bin_icon.png" alt="delete notification"/>               
            </div>
        </div>
    `;
}

function addNotifications(notifications) {
    const section = document.getElementById("all-notifications");
    for (let i=0; i<notifications.length; i++) {
        section.innerHTML += notifications[i];
    }
}

function countNotifications(data) {
    let notifications = 0;
    Object.keys(data).forEach(i => notifications += data[i].length);
    return notifications;
}

axios.get('../php/notifications-api.php').then(response => {
    const h1 = document.querySelector("header h1");
    const n = countNotifications(response.data);
    h1.innerHTML = `You have ${n} notifications to read`;
    const notifications = [];
    response.data["comments"].forEach(elem => notifications.push(createCommentNotification(elem)));
    response.data["ratings"].forEach(elem => notifications.push(createRatingNotification(elem)));
    response.data["friendships"].forEach(elem => notifications.push(createFriendNotification(elem)));
    addNotifications(notifications);
});