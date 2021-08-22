const weatherAPI = document.getElementById("weather");
const API_KEY = "a0383cc2ac06a4b4308bb75c735f62d8"

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const cityTag = document.querySelector('#weather span:first-child');
        const weatherTag =  document.querySelector('#weather span:last-child');
        const temperature = data.main.temp;
        const weather = data.weather[0].main;
        const city = data.name;
        cityTag.innerText = `City: ${city}`;
        weatherTag.innerText = `Weather: ${weather}
        Temporary: ${temperature} °C`;
        const weatherList = [city, weather, temperature];
        //serviceAPI(weatherList);
        console.log('api안에 ',weather);
        // weatherAPI(weather);      
    });
}

function onGeoError() {
    alert("Can't find you. No weather for you.");
}

function weatherAPI() {
    $.ajax({
        type: "POST",
        url: `/${weather}`,
        data: {},
        error: function(xhr, status, error) {
            if (status == 404) {
                alert("서버 응답 실패");
            }
            window.location.href = "/";
        },
        success: function(response) {
            console.log("저장 완료");
        }
    });
}