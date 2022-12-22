
function changeText(label){
    let paragraph = label.querySelector('p');
    let checkbox = label.previousElementSibling;
    console.log(checkbox);
    console.log(paragraph);
    if(checkbox.checked){
        paragraph.style.webkitLineClamp = "3";
    }else{
        paragraph.style.webkitLineClamp = "unset";
    }
}