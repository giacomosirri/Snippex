
function changeText(label){
    let paragraph = label.previousElementSibling
    let checkbox = paragraph.previousElementSibling;
    console.log(checkbox);
    console.log(paragraph);
    if(checkbox.checked){
        paragraph.style.webkitLineClamp = "3";
        label.innerHTML = "read more";
    }else{
        paragraph.style.webkitLineClamp = "unset";
        label.innerHTML = "read less";
    }
}