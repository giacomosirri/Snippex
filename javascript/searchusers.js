

function addRecentSearch(data) {
    const user = document.querySelector("#username").value;
    const query = document.querySelector(".container ul");
    const li = document.createElement("li");
    li.innerHTML = `
            <a href="./searchusers.html">${user}</a>
            <span>${data}</span>
            <button className="delete-recent-search">X</button>`;
    query.appendChild(li);
}

function applyRecentSearch() {
    const user = document.querySelector("#username").value;
    axios.get('../php/searchusers-api.php', {params: {Username: user}}).then(response => {
        addRecentSearch(response.data);
    });
}