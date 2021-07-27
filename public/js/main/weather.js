const API_KEY = {}
function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${API_KEY}&units=metric`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const weather = document.querySelector('#weather span:first-child');
        const city =  document.querySelector('#weather span:last-child');
        weather.innerText = `지역: ${data.name}`;
        city.innerText = `날씨 : ${data.weather[0].main}
        온도 : ${data.main.temp}°C`;
    });
}

function onGeoError() {
    alert("Can't find you. No weather for you.");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
