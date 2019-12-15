const weatherFormClass = document.querySelector(".js-weather"),
    cityFormClass = document.querySelector(".js-cityForm"),
    cityFormInput = cityFormClass.querySelector("input");

const COORDS_LD = 'coords',
    CITY_LD = "city",
    API_KEY = '1dd8007556d86fb87cf00630ec5bd804';
const    SHOWING_CN = "showing",
    NONDISPLAY_WEATHER_CN = "nonDisplay";

function showCityWeather(city,weather){
    cityFormClass.classList.add(NONDISPLAY_WEATHER_CN);
    cityFormClass.classList.remove(SHOWING_CN);
    weatherFormClass.classList.add(SHOWING_CN);
    weatherFormClass.innerText = `${city} ${weather}`;
}

function getCityWeatherData(city){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},kr&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json();
        }).then(function(json){
            const cityName = json.name;
            const weather = json.weather[0].main;
            showCityWeather(cityName,weather);
        });
}

function getCoordWeather(lat,long){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`);
    
}

function saveCoordsData(coordObj){
    localStorage.setItem(COORDS_LD,JSON.stringify(coordObj));
}

function handleCurrentGeoSuccess(position){
    const latitudeData = position.coords.latitude;
    const longitudeData = position.coords.longitude;
    const coordObj = {
        latitude : latitudeData,
        longitude : longitudeData
    };
    saveCoordsData(coordObj);
    getCoordWeather(latitudeData,longitudeData);
}

function handleCurrentGeoErr(){
    console.log("Cant access geo location data");
}

function getCoord(){
    navigator.geolocation.getCurrentPosition(handleCurrentGeoSuccess,handleCurrentGeoErr)
}

function saveCity(city){
    localStorage.setItem(CITY_LD,city);
}

function handleSubmitCity(event){
    event.preventDefault();
    const currentValue = cityFormInput.value;
    saveCity(currentValue);
    getCityWeatherData(currentValue);
}


function setCity(){
    cityFormClass.classList.add(SHOWING_CN);
    cityFormClass.classList.remove(NONDISPLAY_WEATHER_CN);
    cityFormClass.addEventListener("submit",handleSubmitCity);
}

// function loadCoordsWeather(){
//     const loadedCoords = localStorage.getItem(COORDS_LD);
//     if(loadedCoords === null) {
//         getCoord();
//     } else {
//         const parsedCoords = JSON.parse(loadedCoords);
//         getCoordWeather(parsedCoords.latitude, parsedCoords.longitude);
//     }
// }

function loadCityWeather(){
    const loadedCity = localStorage.getItem(CITY_LD);
    if(loadedCity === null){
        setCity();
    } else {
        const parsedCity = loadedCity;
        getCityWeatherData(parsedCity);
    }
}

function loadWeather(){
    // loadCoordsWeather();
    loadCityWeather();
}

function init(){
    loadWeather();
}

init();