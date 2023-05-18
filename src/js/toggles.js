const hourlyForecastButton = document.querySelector(".btn");
const hourlySection = document.querySelector(".hourly-forecast__section");
const buttonHourlyIcon = document.querySelector(".btn__icon");
// hourlyForecastButton.addEventListener("click", isActive);
// hourlyForecastButton.addEventListener("click", toggleButton);

// export function toggleHourlyForecast() {
//   hourlySection.classList.toggle("active");
//   hourlyForecastButton.classList.toggle("active btn-active");
//   buttonHourlyIcon.classList.toggle("btn__icon-active");
// }

// export function toggleButton() {
//   hourlyForecastButton.classList.toggle("active");
// }

hourlyForecastButton.addEventListener("click", changeColor);

export function changeColor() {
  const isActive = myButton.getAttribute("data-active") === "true";

  if (isActive) {
    myButton.removeAttribute("data-active");
  } else {
    myButton.setAttribute("data-active", "true");
  }
}
