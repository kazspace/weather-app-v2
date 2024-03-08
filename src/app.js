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

  temperatureElement.innerHTML = Math.round(temperature);

  mainCity.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  timeElement.innerHTML = formatDate(date);
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

// default city on load

searchingCity("London");
