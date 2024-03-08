function refreshWeather(response) {
  let temperatureElement = document.querySelector("#weather-current-temp");
  let temperature = response.data.temperature.current;

  let mainCity = document.querySelector("#weather-city");

  let humidityElement = document.querySelector("#humidity");

  let windElement = document.querySelector("#wind");

  let description = document.querySelector("#weather-description");

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}">`;

  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLike = response.data.temperature.feels_like;

  feelsLikeElement.innerHTML = `${Math.round(feelsLike)}°C`;

  temperatureElement.innerHTML = Math.round(temperature);

  mainCity.innerHTML = `${response.data.city}, ${response.data.country}`;
  description.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  timeElement.innerHTML = formatDate(date);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchingCity(city) {
  let apiKey = "73f0d06a58bdbf0dee0944t7de9b9o05";
  let siteURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(siteURL).then(refreshWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-city-input");

  searchingCity(searchedCity.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

// forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "73f0d06a58bdbf0dee0944t7de9b9o05";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiURL).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<span>
              <div class="weather-forecast-date">${formatDay(day.time)}</div>
              <img src="${
                day.condition.icon_url
              }" class="weather-forecast-icon">
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temp-max">${Math.round(
                  day.temperature.maximum
                )}°C</span>
                                               
                <span class="weather-forecast-temp-min">${Math.round(
                  day.temperature.minimum
                )}°C</span>
              </div>
            </div>
            </span>
          `;
    }
  });
  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

// default city on load

searchingCity("London");
displayForecast();
