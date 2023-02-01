
function deleteSearch(object){
    object.parentNode.style.display='none';
}
function addRecentSearch(data) {
    const user = document.querySelector("#username").value;
    const query = document.querySelector(".container ul");
    const li = document.createElement("li");
    const request = data ? "go to profile" : "send request";
    li.innerHTML = `
            <a href="./searchusers.html">${user}</a>
            <button class="btn btn-primary" onclick="location.href ='../php/userprofile.php?Username=${user}'">${request}</button>
            <button class="btn btn-primary float-end" onclick="deleteSearch(this)">X</button>`;
    query.appendChild(li);
}

function applyRecentSearch() {
    const user = document.querySelector("#username").value;
    axios.get('../php/searchusers-api.php', {params: {Username: user}})
        .then(response => addRecentSearch(response.data));
}

