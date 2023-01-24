axios.post('../php/login-api.php', {})
    .then(response => {
        alert(response.data);
    });