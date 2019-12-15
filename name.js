const nameFormClass = document.querySelector(".js-nameForm"),
    nameDataClass = document.querySelector(".js-name"),
    nameInput = nameFormClass.querySelector("input");

const NAME_ID = "user_name",
    SHOWING_INPUT_CN = "showing",
    NONDISPLAY_CN = "nonDisplay";

function saveName(name){
    localStorage.setItem(NAME_ID,name);
}

function showName(name){
    nameFormClass.classList.remove(SHOWING_INPUT_CN);
    nameFormClass.classList.add(NONDISPLAY_CN);
    nameDataClass.classList.add(SHOWING_INPUT_CN);
    nameDataClass.innerText = `Hi ${name}`;
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = nameInput.value;
    showName(currentValue);
    saveName(currentValue);
}

function setName(){
    nameFormClass.classList.add(SHOWING_INPUT_CN);
    nameFormClass.classList.remove(NONDISPLAY_CN);
    nameFormClass.addEventListener("submit",handleSubmit);
}

function init() {
    const nameData = localStorage.getItem(NAME_ID);
    if(nameData === null)
    {
        setName();
    } else {
        showName(nameData);
    }
}
init();
