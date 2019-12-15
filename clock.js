const clockData = document.querySelector(".js-clock"),
    timeH1 = clockData.querySelector("h1");

function showTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    timeH1.innerText= `${hours > 10 ? hours : `0${hours}`}:${minutes > 10 ? minutes : `0${minutes}`}`;
}

function init(){
    showTime();
    // setInterval(showTime,1000);
}

init();