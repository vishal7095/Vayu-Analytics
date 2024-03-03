let dateTime = document.querySelector('.date-time');
let locationInfo = document.querySelector('.location');
let currentTemp = document.querySelector('.current-temp');
let weatherDes = document.querySelector('.weather-des');
let humidityInfo = document.querySelector('.humidity-info');
let windSpeedInfo = document.querySelector('.wind-speed-info');
let weatherImage = document.getElementById("weatherImage");

let weatherData = {};

function updateDateTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let formattedTime = hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

    dateTime.textContent = "As of " + formattedTime;
}

function updateWeatherOverview() {
    locationInfo.textContent = weatherData.location;
    currentTemp.textContent = weatherData.temperature;
    weatherDes.textContent = weatherData.weatherDes;
    humidityInfo.textContent = "Humidity: " + weatherData.humidity;
    windSpeedInfo.textContent = "Wind-Speed: " + weatherData.windSpeed;

    setWeatherBackground(weatherData.weatherDes);

    weatherImage.src = `http://openweathermap.org/img/wn/${weatherData.weatherIcon}.png`;
}

function searchWeather(event) {
    event.preventDefault();
    const apiKey = "79eed81a4dc8c306c69475e91ea33ac8";
    const location = document.getElementById("search").value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            weatherData = {
                location: `${data.name}, ${data.sys.country}`,
                temperature: `${data.main.temp}°C`,
                weatherDes: data.weather[0].description,
                humidity: `${data.main.humidity}%`,
                windSpeed: `${data.wind.speed} m/s`,
                weatherIcon: data.weather[0].icon
            }
            updateWeatherOverview(weatherData);
        })
        .catch(error => console.error("Error fetching weather data:", error));
}

function setWeatherBackground(weatherDescription) {
    const body = document.body;

    const backgroundImages = {
        "clear sky": "./images/clear_sky.jpeg",
        'haze': "./images/haze.jpeg",
        'overcast clouds': "./images/overcast_clouds.jpg",
        'broken clouds': "./images/broken_clouds.jpg",
        'drizzle': "./images/drizzle.jpeg",
        'few clouds': "./images/few_clouds.jpg",
        'fog': "./images/fog.jpg",
        'heavy rain': "./images/heavy_rain.jpg",
        'heavy snow': "./images/heavy_snow.jpeg",
        'light rain': "./images/light_rain.jpg",
        'light snow': "./images/light_snow.jpeg",
        'mist': "./images/mist.jpeg",
        'scattered clouds': "./images/scattered_clouds.jpeg",
        'smoke': "./images/smoke.jpeg",
        'thunderstorm': "./images/thunderstorm.jpg",
        'moderate rain': "./images/moderate_rain.jpg",
        'moderate snow': "./images/moderate_snow.jpg",
    };

    const defaultImage = "images/clear_sky.jpeg";
    const lowercaseDescription = weatherDescription.toLowerCase();
    const backgroundImageURL = backgroundImages[lowercaseDescription] || defaultImage;

    body.style.backgroundImage = `url(${backgroundImageURL})`;
}

updateDateTime();