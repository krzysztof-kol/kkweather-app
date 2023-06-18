// import { changeUnits, changeUnitsToImperial, changeUnitsToNormal } from "./changeUnits.js";
import { changeUnitsToImperial, changeUnitsToNormal, changeUnitsType, unitsType } from "./changeUnits.js";
import { temperature, precip, windspeed } from "./index.js";
import { isImperial } from "./changeUnits.js";

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

// togglesy unit buttonów

const unitButton1 = document.querySelector(".unit-button1");
const unitButton2 = document.querySelector(".unit-button2");

unitButton1.addEventListener("click", () => {
  unitButton2.classList.remove("unit-button-active");
  unitButton1.classList.add("unit-button-active");

  changeUnitsToNormal();
});

unitButton2.addEventListener("click", () => {
  unitButton1.classList.remove("unit-button-active");
  unitButton2.classList.add("unit-button-active");

  changeUnitsToImperial();
});

unitButton1.addEventListener("mouseover", () => {
  unitButton1.classList.add("unit-button-hover");
});

unitButton1.addEventListener("mouseout", () => {
  unitButton1.classList.remove("unit-button-hover");
});

unitButton2.addEventListener("mouseover", () => {
  unitButton2.classList.add("unit-button-hover");
});

unitButton2.addEventListener("mouseout", () => {
  unitButton2.classList.remove("unit-button-hover");
});
