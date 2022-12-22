
function changeText(){
    let label = document.querySelector(".post-content label");
    let checkbox = document.querySelector(".post-content input[type=checkbox]");
    if(checkbox.checked){
        label.innerHTML = "read more";
    }else{
        label.innerHTML = "read less";
    }
}