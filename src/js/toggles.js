const hourlyForecastButton = document.querySelector(".btn");
const hourlySection = document.querySelector(".hourly-forecast__section");
const buttonHourlyIcon = document.querySelector(".btn__icon");
hourlyForecastButton.addEventListener("click", toggleHourlyForecast);
hourlyForecastButton.addEventListener("click", toggleHourlyForecast);
hourlyForecastButton.addEventListener("click", toggleHourlyForecast);

function toggleHourlyForecast() {
  hourlySection.classList.toggle("active");
  hourlyForecastButton.classList.toggle("btn-active");
  buttonHourlyIcon.classList.toggle("btn__icon-active");
}

function toggleButton() {
  hourlyForecastButton.classList.toggle("active");
}
