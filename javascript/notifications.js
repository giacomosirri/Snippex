function addNotification(data) {
    return `
    <div class="row align-items-center">
        <div class="col-md-1"></div>
        <p class="col-5 col-xl-5 notification-type" style="font-size: 15px">...</p>
        <p class="col-3 col-xl-2 align-self-center notification-date" style="font-size: 80%; color:#6e6e6e">...</p>
        <button class="btn btn-outline-primary btn-sm col-2 col-xl-1 accept-friendship"
                style="font-size: 12px">...
        </button>
        <div class="col-1 d-flex justify-content-start" style="margin-left: 15px">
            <img class="delete-notification" src="../icons/bin_icon.png" alt="delete notification"/>
        </div>
    </div>`
        ;
}

axios.get('../php/notifications-api.php').then(response => {
    const section = document.getElementById("all-notifications");
    for (let i=0; i<response.data.length; i++) {
    }
});