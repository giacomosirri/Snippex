
window.onload = (event) => {
    $("#username").keyup(function(){
        addProposal($("#username").val())
    });
    displayRecentSearch();
};

function deleteSearch(object){
    object.parentNode.style.display='none';
}
function addProposal(user) {
    if(user != null && user.length > 0){
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
            document.getElementById("proposes").innerHTML="";

            if(response.data.length > 0) {
                return appendUsers(response.data);
            }
            return;
        });
}

function appendUser(user){
    const div = document.createElement("div");
    div.classList.add("input-group");
    div.innerHTML =
        `<div class="input-group-prepend">
            <img src="../profile_pics/${user}.png">
         </div>
         <button type="button" class="search-button btn btn-light col-sm-2 sol-ms-2 m-0">${user}</button>`

    div.querySelector("img").addEventListener('click', () => {
        addRecentUser(user);
        window.location.replace("./userprofile.php?Username="+user);
        //change page
    })
    div.querySelector(".search-button").addEventListener('click', () => {
        addRecentUser(user);
        window.location.replace("./userprofile.php?Username="+user);
        //change page
    })
    document.getElementById("proposes").appendChild(div);
}

function appendUsers(users){
    const usersWithoutDuplicate = new Set(users)
    usersWithoutDuplicate.forEach(x => appendUser(x));
}

function addRecentUser(user){
    axios.get('../php/searchusers-api-recentsearch.php', {params:{Username:user}});
}






