const filePicker = document.getElementById("choose-image");
filePicker.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        const base64 = reader.result;
        axios.put('../php/image-api.php', {Image: base64}).then(() => location.reload());
    }
}