const hourlyForecastButton = document.querySelector(".btn");
const hourlySection = document.querySelector(".hourly-forecast__section");
const buttonHourlyIcon = document.querySelector(".btn__icon");
hourlyForecastButton.addEventListener("click", toggleHourlyForecast);

hourlyForecastButton.addEventListener("mouseover", () => {
  buttonHourlyIcon.classList = "btn__icon btn__icon-active";
  hourlyForecastButton.classList = "btn btn-active";
});

hourlyForecastButton.addEventListener("mouseout", () => {
  buttonHourlyIcon.classList = "btn__icon ";
  hourlyForecastButton.classList = "btn";
});

hourlyForecastButton.addEventListener("touchstart", () => {
  buttonHourlyIcon.classList = "btn__icon btn__icon-active";
  hourlyForecastButton.classList = "btn btn-active";
});

hourlyForecastButton.addEventListener("touchend", () => {
  buttonHourlyIcon.classList = "btn__icon";
  hourlyForecastButton.classList = "btn";
});
// hourlyForecastButton.addEventListener("click", buttonBlur);
// hourlyForecastButton.addEventListener("click", toggleButton);

export function toggleHourlyForecast() {
  hourlySection.classList.toggle("active");
  buttonHourlyIcon.classList.toggle("btn__icon-active");
  hourlyForecastButton.classList.toggle("btn-active");
  hourlyForecastButton.classList.toggle("btn-unfocus");
  // buttonBlur(hourlyForecastButton);
}

export function buttonHover() {}
