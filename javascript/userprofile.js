function addBasicInfo(data) {
    return `
        <div class="col-10 d-flex justify-content-center">
            <div class="d-flex justify-content-start flex-column">
                <h1 style="color: black">${data[0]["Name"]} ${data[0]["Surname"]}</h1>
                <h2 style="color: black; font-size: 18px; margin-top: -14px">~${data[0]["Username"]}</h2>
                <div style="margin-bottom: 5px">
                    <img id="profile-pic" src="../profile_pics/${data[0]["ProfilePic"]}" alt="profile pic"/>
                </div>
            </div>
        </div>
    `;
}
axios.get('../php/userprofile-api.php').then(response => {
    const profileHeader = addBasicInfo(response.data);
    const header = document.getElementById("header");
    header.innerHTML += profileHeader;
});