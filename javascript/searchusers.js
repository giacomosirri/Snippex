const user = document.querySelector("#username").innerText;

function addRecentSearch(user, friendship) {
    const query = document.querySelector(".container ul")
    query.appendChild(`
        <li>
            <a href="./searchusers.html">${user}</a>
            <span>${friendship}</span>
            <button className="delete-recent-search">X</button>
        </li>
`)}
axios.get('../php/searchusers-api.php', {params: {Username: user}}).then(response => {
    addRecentSearch(user, response.data);
});