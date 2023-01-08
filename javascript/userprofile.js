function addBasicInfo(data) {
    return `
            <div class="row">
            <div class="col-12 d-flex justify-content-center">
                <div class="d-flex justify-content-start flex-column">
                    <h1 style="color: black">${data["name"]} ${data["surname"]}</h1>
                    <h2 style="color: black; font-size: 18px; margin-top: -14px">~${data["username"]}</h2>
                    <div style="margin-bottom: 5px">
                        <img id="profile-pic" src="../img/${data["profilePic"]}.jpg" alt="profile pic"/>
                    </div>
                </div>
            </div>
        </div>
    `;
}

axios.get('php/userprofile-api.php').then(response => {
    const profileHeader = addBasicInfo(response.data);
    const header = document.querySelector("main>header");
    header.innerHTML += profileHeader;
});