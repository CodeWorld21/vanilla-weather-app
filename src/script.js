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

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
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
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature) + `\u00B0`;
}

let celsiusTemperature = null;

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#weather-temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature) + `\u00B0`;
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

  let icon = response.data.weather.icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature);
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


function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="row weather-timeline-info">
                <div class="col-md-12 weather-time-icons">
                  <img
                    class="weather-img"
                    src="http://openweathermap.org/img/wn/${
                      forecast.weather[0].icon
                    }@2x.png"
                  />
                  <h3 class="weather-time-degrees">
                      ${Math.round(forecast.main.temp)}&deg;C
                  </h3>
                  <p class="weather-time-hour">
                      ${formatHours(forecast.dt * 1000)}
                  </p>
                </div>
              </div>
  `;
  }
}


function searchCity(city) {
  let apiKey = "51af75cde5ea023078e9b9810c6de21a";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
