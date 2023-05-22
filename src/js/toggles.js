const hourlyForecastButton = document.querySelector(".btn");
const hourlySection = document.querySelector(".hourly-forecast__section");
const buttonHourlyIcon = document.querySelector(".btn__icon");
hourlyForecastButton.addEventListener("click", toggleHourlyForecast);
// hourlyForecastButton.addEventListener("click", buttonBlur);
// hourlyForecastButton.addEventListener("click", toggleButton);

export function buttonBlur(button) {
  button.blur();
}

export function toggleHourlyForecast() {
  hourlySection.classList.toggle("active");
  buttonHourlyIcon.classList.toggle("btn__icon-active");
  hourlyForecastButton.classList.toggle("btn-active");
  hourlyForecastButton.classList.toggle("btn-unfocus");
  // buttonBlur(hourlyForecastButton);
}
