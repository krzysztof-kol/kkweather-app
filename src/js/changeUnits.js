import { temperatureArray, precipArray, windspeedArray, createArraysForUnits } from "./index.js";

export let unitsType = true; // Celsjusz
export let isImperial = false;

let originalTemperature = [];
let originalPrecip = [];
let originalWindspeed = [];

export function changeUnitsToImperial() {
  if (unitsType === true) {
    createOriginalArrays();
    changeUnitsToF(originalTemperature, originalPrecip, originalWindspeed);
  }
}

export function changeUnitsToNormal() {
  if (unitsType === false) {
    createOriginalArrays();
    changeUnitsToC(originalTemperature, originalPrecip, originalWindspeed);
  }
}

export function changeUnitsType() {
  if (isImperial === true) {
    createOriginalArrays();

    changeUnitsToF(originalTemperature, originalPrecip, originalWindspeed);
  } else if (isImperial === false) return;
}

export function changeUnitsToC(t, p, w) {
  unitsType = true;
  isImperial = false;

  t.forEach((element, index) => {
    let text = element.textContent;
    let number = parseInt(text);
    element.textContent = Math.round(((number - 32) * 5) / 9) + "°C";
  });

  p.forEach((element, index) => {
    let text = element.textContent;
    let number = parseInt(text);
    element.textContent = number * 25.4 + "mm";
  });

  w.forEach((element, index) => {
    let text = element.textContent;
    let number = parseInt(text);
    element.textContent = Math.round(number / 0.621371) + "km/h";
  });
}
export function changeUnitsToF(t, p, w) {
  unitsType = false;
  isImperial = true;

  t.forEach((element) => {
    let text = element.textContent;
    let number = parseInt(text);
    element.textContent = Math.round((number * 9) / 5 + 32) + "°F";
  });

  p.forEach((element) => {
    let text = element.textContent;
    let number = parseFloat(text);
    element.textContent = (number / 25.4).toFixed(2) + "in";
  });

  w.forEach((element) => {
    let text = element.textContent;
    let number = parseInt(text);
    element.textContent = Math.round(number * 0.621371) + "mph";
  });
}

export function createOriginalArrays() {
  originalTemperature = temperatureArray.slice();
  originalPrecip = precipArray.slice();
  originalWindspeed = windspeedArray.slice();

  return { originalTemperature, originalPrecip, originalWindspeed };
}
