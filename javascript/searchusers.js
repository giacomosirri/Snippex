const user = document.querySelector("#username").innerText;

function addRecentSearch(data) {
    const query = document.querySelector(".container ul");
    const li = document.createElement("li");
    li.innerHTML = `
            <a href="./searchusers.html">${user}</a>
            <span>${data}</span>
            <button className="delete-recent-search">X</button>`;
    query.appendChild(li);
}

axios.get('../php/searchusers-api.php', {params: {Username: user}}).then(response => {
    console.log(response.data[0]);
    addRecentSearch(response.data[0]);
});