// Corrected DOM elements selection
const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput"); // Fixed typo
const search = document.querySelector(".search");
const btn = document.querySelector(".submit"); // Fixed class name
const cities = document.querySelectorAll(".city");

// Default city and API configuration
let cityInput = "London";
const API_KEY =  "464228e52b6a40ecb74125833252504"  // Get from weatherapi.com
const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=`;

// City click handler
cities.forEach((city) => {
    city.addEventListener("click", (e) => {
        cityInput = e.target.textContent;
        fetchWeatherData();
        app.style.opacity = "0";
    });
});

// Form submission handler
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!search.value.trim()) {
        alert("Please enter a city name");
        return;
    }
    cityInput = search.value.trim();
    fetchWeatherData();
    search.value = "";
    app.style.opacity = "0";
});

// Date formatting function
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Time formatting function
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Main weather fetch function
async function fetchWeatherData() {
    try {
        const response = await fetch(`${API_URL}${cityInput}`);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        
        // Update DOM elements
        temp.innerHTML = `${data.current.temp_c}&deg;C`;
        conditionOutput.textContent = data.current.condition.text;
        nameOutput.textContent = data.location.name;
        
        // Date and time
        dateOutput.textContent = formatDate(data.location.localtime);
        timeOutput.textContent = formatTime(data.location.localtime);

        // Weather details
        cloudOutput.textContent = `${data.current.cloud}%`;
        humidityOutput.textContent = `${data.current.humidity}%`;
        windOutput.textContent = `${data.current.wind_kph} km/h`; // Fixed property name

        // Weather icon
        icon.src = data.current.condition.icon;

        // Update background based on condition
        updateBackground(data.current.condition.code, data.current.is_day);

        app.style.opacity = "1";

    } catch (error) {
        alert(error.message);
        app.style.opacity = "1";
    }
}

// Background update function
function updateBackground(conditionCode, isDay) {
    const timeOfDay = isDay ? "day" : "night";
    let backgroundImage = `url(images/${timeOfDay}/clear.jpg)`;

    // Condition codes from WeatherAPI documentation
    const cloudCodes = [1003, 1006, 1009, 1030, 1135, 1147];
    const rainCodes = [1063, 1072, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195];
    const snowCodes = [1066, 1069, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225];

    if (cloudCodes.includes(conditionCode)) {
        backgroundImage = `url(images/${timeOfDay}/cloudy.jpg)`;
    } else if (rainCodes.includes(conditionCode)) {
        backgroundImage = `url(images/${timeOfDay}/rainy.jpg)`;
    } else if (snowCodes.includes(conditionCode)) {
        backgroundImage = `url(images/${timeOfDay}/snow.jpg)`; // Fixed typo
    }

    app.style.backgroundImage = backgroundImage;
    btn.style.backgroundColor = isDay ? "#e5b992" : "#181e27";
}

// Initial load
fetchWeatherData();