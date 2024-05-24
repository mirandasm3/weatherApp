const apiKey = '99d3b4b482c7cf8ddd380789faee89d7';
const baseUrl = 'https://api.openweathermap.org/data/2.5/';

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('currentWeatherBtn').addEventListener('click', function() {
        const city = document.getElementById('city').value;
        if (city) {
            fetchCurrentWeather(city);
        } else {
            alert('Please, insert a city name.');
        }
    });

    document.getElementById('forecastWeatherBtn').addEventListener('click', function() {
        const city = document.getElementById('city').value;
        if (city) {
            fetchWeatherForecast(city);
        } else {
            alert('Please, insert a city name.');
        }
    });

    function fetchCurrentWeather(city) {
        const url = `${baseUrl}weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayCurrentWeather(data);
            })
            .catch(error => {
                console.error('Current weather error', error);
            });
    }

    function fetchWeatherForecast(city) {
        const url = `${baseUrl}forecast?q=${city}&appid=${apiKey}&units=metric&lang=es`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayWeatherForecast(data);
            })
            .catch(error => {
                console.error('Forecast weather error:', error);
            });
    }

    function displayCurrentWeather(data) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <div class="current-weather-title">
                <h2>Current weather in ${data.name}</h2>
            </div>
            <div class="current-weather-card">
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Weather description: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind speed: ${data.wind.speed} m/s</p>
            </div>
        `;
    }
    
    

    function displayWeatherForecast(data) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML =` <h2>Weather forecast in ${data.city.name}</h2>`;

        const forecastContainer = document.createElement('div');
        forecastContainer.className = 'forecast-container';

        for (let i = 0; i < data.list.length; i += 8) {
            const forecast = data.list[i];
            const date = new Date(forecast.dt * 1000);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

            const forecastCard = document.createElement('div');
            forecastCard.className = 'forecast-card';

            forecastCard.innerHTML = `
                <h3>${date.toLocaleDateString('es-ES', options)}</h3>
                <p>Temperature: ${forecast.main.temp} °C</p>
                <p>Weather description: ${forecast.weather[0].description}</p>
                <p>Humidity: ${forecast.main.humidity}%</p>
                <p>Wind speed: ${forecast.wind.speed} m/s</p>
            `;

            forecastContainer.appendChild(forecastCard);
        }

        resultDiv.appendChild(forecastContainer);
    }
});
