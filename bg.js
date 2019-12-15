const bodyImage = document.querySelector("body");

const IMAGE_NUMBER = 3;

function bgDrawer(selectNumber){
    const image = new Image();
    image.src = `images/${selectNumber}.jpg`;
    image.classList.add("bg");
    bodyImage.prepend(image);
}

function randomNumberGenerator(){
    const rdNumber = Math.floor(Math.random()*IMAGE_NUMBER) + 1;
    return rdNumber;
}

function init(){
    const randomNumber = randomNumberGenerator();
    bgDrawer(randomNumber);
}

init();