var navContent = document.querySelector('.navContent');
var navTopIcon = document.querySelector('.fas');
var dropdown = document.querySelector('.dropdown');

function displayContent(){
    navContent.classList.toggle('displayFlex');
    navTopIcon.classList.toggle('fa-bars');
    navTopIcon.classList.toggle('fa-times');
}

function activateDropdown(){
    dropdown.classList.toggle('displayFlex');
}