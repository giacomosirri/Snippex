document.getElementById("search-button").addEventListener("click", applyRecentSearch);

function deleteSearch(object){
    object.parentNode.style.display='none';
}
function addRecentSearch(data) {
    const user = document.querySelector("#username").value;
    const query = document.querySelector(".container ul");
    const li = document.createElement("li");
    const request = data ? "go to profile" : "send request";
    li.innerHTML = `
            <label class="user-label">${user}</label>
            <button class="delete btn btn-primary float-end">X</button>`;
    li.getElementsByClassName("user-label")[0]
        .addEventListener("click", () => window.open(`../php/userprofile.php?Username=${user}`, "_self"));
    li.getElementsByClassName("delete")[0].addEventListener("click", () => deleteSearch(li));
    query.appendChild(li);
}

function applyRecentSearch() {
    const user = document.querySelector("#username").value;
    axios.get('../php/searchusers-api.php', {params: {Username: user}}).then(response => addRecentSearch(response.data));
}

