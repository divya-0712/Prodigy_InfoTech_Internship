// Replace with your actual OpenWeatherMap API key
const apiKey = '11d446d473c1b15d91d8be7029aacfa1';

// Function to get weather by user's input (city name)
function getWeatherByInput() {
    const location = document.getElementById('location-input').value.trim();
    if (location) {
        fetchWeatherData(`q=${location}`);
    } else {
        alert('Please enter a city name.');
    }
}

// Function to get weather by user's current location
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(`lat=${latitude}&lon=${longitude}`);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Function to fetch weather data from OpenWeatherMap API
function fetchWeatherData(query) {
    const url = `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`City not found (Error ${response.status}): ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => displayWeatherData(data))
        .catch(error => alert(`Error fetching weather data: ${error.message}`));
}

// Function to display weather data on the weather card
function displayWeatherData(data) {
    const location = document.getElementById('location');
    const date = document.getElementById('date');
    const temp = document.getElementById('temp');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');

    location.textContent = `${data.name}, ${data.sys.country}`;
    date.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}
