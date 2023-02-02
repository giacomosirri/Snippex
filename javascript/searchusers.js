
window.onload = (event) => {
    document.getElementById("username").addEventListener('input', addProposal);
};

function deleteSearch(object){
    object.parentNode.style.display='none';
}
function addProposal(user) {
    if(user.data != null && user.data.length > 0){
        displayProposal();
    }else{
        displayRecentSearch();
    }
}

function displayProposal(){
    const user = document.querySelector("#username").value;
    return axios.get('../php/searchusers-api-proposal.php', {params: {Username: user}})
        .then(response => {
            document.getElementById("proposes").innerHTML="";
            return appendUsers(response.data.map(x => x.Username));
        });
}

function displayRecentSearch(){
    axios.get('../php/searchusers-api-recentsearch.php')
        .then(response =>
        {
            console.log(response.data);
            if(response.data.length > 0) {
                document.getElementById("proposes").innerHTML="";
                return appendUsers(response.data);
            }else{
                document.getElementById("proposes").innerHTML="";
                return;
            }
        });
}

function appendUser(user){
    const div = document.createElement("div");
    div.classList.add("input-group");
    div.innerHTML =
        `<div class="input-group-prepend">
            <span class="input-group-text h-100">&#128269;</span>
         </div>
         <button type="button" class="search-button btn btn-light col-sm-2 sol-ms-2 m-0">${user}</button>`
    div.querySelector(".search-button").addEventListener('click', () => addRecentUser(user))
    document.getElementById("proposes").appendChild(div);
}

function appendUsers(users){
    users.forEach(x => appendUser(x));
}

function addRecentUser(user){
    axios.get('../php/searchusers-api-recentsearch.php', {params:{Username:user}});
}






