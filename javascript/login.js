axios.get('../php/login-api.php').then(response => {
    console.log(response.data);
});