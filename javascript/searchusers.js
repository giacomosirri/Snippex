
window.onload = (event) => {
    document.getElementById("search-button").addEventListener("click", appendUser);
    document.getElementById("username").addEventListener('input', addProposal);
};

function deleteSearch(object){
    object.parentNode.style.display='none';
}
function addRecentSearch() {
    const user = document.querySelector("#username").value;
    const query = document.querySelector(".container ul");
    const li = document.createElement("li");
    li.innerHTML = `
            <label class="user-label">${user}</label>
            <button class="delete btn btn-primary float-end">X</button>`;
    li.getElementsByClassName("user-label")[0]
        .addEventListener("click", () => window.open(`../php/userprofile.php?Username=${user}`, "_self"));
    li.getElementsByClassName("delete")[0].addEventListener("click", () => deleteSearch(li));
    query.appendChild(li);
}

function appendUser(user){
    const div = document.createElement("div");
    div.classList.add("input-group");
    div.innerHTML =
        `<div class="input-group-prepend">
            <span class="input-group-text h-100">&#128269;</span>
         </div>
         <button type="button" class="search-button btn btn-light col-sm-2 sol-ms-2 m-0">${user}</button>`
    div.querySelector(".search-button").addEventListener("click", () => window.open(`../php/userprofile.php?Username=${user}`, "_self"));
    document.getElementById("proposes").innerHTML="";
    document.getElementById("proposes").appendChild(div);
}

function addProposal() {
    const user = document.querySelector("#username").value;
    axios.get('../php/searchusers-api.php', {params: {Username: user}})
        .then(response => appendUser(response.data[0].Username));
}



