import { temperatureArray, precipArray, windspeedArray } from "./index.js";

export let unitsType = true; // Celsjusz jako domyślna jednostka

export function changeUnitsToImperial() {
  let originalTemperature = temperatureArray.slice();
  let originalPrecip = precipArray.slice();
  let originalWindspeed = windspeedArray.slice();

  if (unitsType === true) {
    unitsType = false;

    originalTemperature.forEach((element, index) => {
      let text = element.textContent;
      let number = parseInt(text);
      element.textContent = Math.round((number * 9) / 5 + 32) + "°F";
    });

    originalPrecip.forEach((element, index) => {
      let text = element.textContent;
      let number = parseFloat(text);
      element.textContent = (number / 25.4).toFixed(2) + "in";
    });

    originalWindspeed.forEach((element, index) => {
      let text = element.textContent;
      let number = parseInt(text);
      element.textContent = Math.round(number * 0.621371) + "mph";
    });
  }
}

export function changeUnitsToNormal() {
  let originalTemperature = temperatureArray.slice();
  let originalPrecip = precipArray.slice();
  let originalWindspeed = windspeedArray.slice();

  if (unitsType === false) {
    unitsType = true;

    originalTemperature.forEach((element, index) => {
      let text = element.textContent;
      let number = parseInt(text);
      element.textContent = Math.round(((number - 32) * 5) / 9) + "°C";
    });

    originalPrecip.forEach((element, index) => {
      let text = element.textContent;
      let number = parseInt(text);
      element.textContent = (number * 25.4).toFixed(2) + "mm";
    });

    originalWindspeed.forEach((element, index) => {
      let text = element.textContent;
      let number = parseInt(text);
      element.textContent = Math.round(number / 0.621371) + "km/h";
    });
  }
}
