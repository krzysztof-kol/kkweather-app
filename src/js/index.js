import "./getCoords.js";
import { getWeather } from "./getWeather.js";
import { getCurrentTimeData } from "./getWeather.js";
import { renderCurrentData } from "./getWeather.js";
import { getCityData } from "./getCity.js";
// import "./toggles.js";

renderCurrentData();
getCurrentTimeData();

const hourlyForecastButton = document.querySelector(".btn");
const hourlySection = document.querySelector(".hourly-forecast__section");
const buttonHourlyIcon = document.querySelector(".btn__icon");
hourlyForecastButton.addEventListener("click", toggleHourlyForecast);
hourlyForecastButton.addEventListener("click", toggleHourlyForecast);
hourlyForecastButton.addEventListener("click", toggleHourlyForecast);

export function toggleHourlyForecast() {
  hourlySection.classList.toggle("active");
  hourlyForecastButton.classList.toggle("btn-active");
  buttonHourlyIcon.classList.toggle("btn__icon-active");
}

export function toggleButton() {
  hourlyForecastButton.classList.toggle("active");
}

setInterval(getCurrentTimeData, 1000);

// getCityData();
