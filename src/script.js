function formatTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return ` | ${hours}:${minutes}`;
}

function formatDate(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentYear = date.getFullYear();
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  let formattedDate = `${currentDate}, ${currentMonth} ${currentYear}`;

  return formattedDate;
}

let currently = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[currently.getDay()];
let currentDay = document.querySelector("#day");
currentDay.innerHTML = day;

let timeElement = document.querySelector("#time");
let currentTime = new Date();
timeElement.innerHTML = formatTime(currentTime);

let dateElement = document.querySelector("#month");
let currentDate = new Date();
dateElement.innerHTML = formatDate(currentDate);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#weather-temperature");
  temperatureElement.innerHTML = `68\u00B0`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#weather-temperature");
  temperatureElement.innerHTML = `20\u00B0`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function displayWeatherCondition(response) {
  console.log(response.data);

  let city = response.data.name;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${city} |`;

  let country = response.data.sys.country;
  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = `${country}`;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#weather-temperature");
  temperatureElement.innerHTML = `${temperature}°`;

  let skyDescription = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${skyDescription}`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity} %`;

  let pressure = Math.round(response.data.main.pressure);
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = `${pressure} hPa`;

  let clouds = Math.round(response.data.clouds.all);
  let cloudsElement = document.querySelector("#cloud-coverage");
  cloudsElement.innerHTML = `${clouds} %`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind} km/h`;

  let tempMin = Math.round(response.data.main.temp_min);
  let tempMinElement = document.querySelector("#temp-min");
  tempMinElement.innerHTML = `${tempMin}°C`;

  let tempMax = Math.round(response.data.main.temp_max);
  let tempMaxElement = document.querySelector("#temp-max");
  tempMaxElement.innerHTML = `${tempMax}°C`;

  let sunRise = new Date(response.data.sys.sunrise * 1000).getHours() + ":00";
  let sunRiseElement = document.querySelector("#sunrise");
  sunRiseElement.innerHTML = `${sunRise}`;

  let sunSet = new Date(response.data.sys.sunset * 1000).getHours() + ":00";
  let sunSetElement = document.querySelector("#sunset");
  sunSetElement.innerHTML = `${sunSet}`;
}

function searchCity(city) {
  let apiKey = "51af75cde5ea023078e9b9810c6de21a";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "51af75cde5ea023078e9b9810c6de21a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getGeolocation() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let geoButton = document.querySelector("#location-btn");
geoButton.addEventListener("click", getGeolocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Dublin,IE");
