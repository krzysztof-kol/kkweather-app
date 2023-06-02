const hourlyForecastButton = document.querySelector(".btn");
const hourlySection = document.querySelector(".hourly-forecast__section");
const buttonHourlyIcon = document.querySelector(".btn__icon");
hourlyForecastButton.addEventListener("click", toggleHourlyForecast);

let isClicked = 0;

hourlyForecastButton.addEventListener("click", () => {
  isClicked++;

  if (isClicked % 2 === 0) {
    buttonHourlyIcon.classList = "btn__icon";
    hourlyForecastButton.classList = "btn";
  } else {
    buttonHourlyIcon.classList = "btn__icon btn__icon-active";
    hourlyForecastButton.classList = "btn btn-active";
  }
});

hourlyForecastButton.addEventListener("mouseover", () => {
  buttonHourlyIcon.classList.add("btn__icon-hover");
  hourlyForecastButton.classList.add("btn-hover");
});

hourlyForecastButton.addEventListener("mouseout", () => {
  buttonHourlyIcon.classList.remove("btn__icon-hover");
  hourlyForecastButton.classList.remove("btn-hover");
});

export function toggleHourlyForecast() {
  hourlySection.classList.toggle("active");
}

export function buttonHover() {}
