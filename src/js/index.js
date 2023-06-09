import { getCoordinates, hideAlertBar } from "./getCoords.js";
import { getTimeData } from "./getTimeData.js";
import {
  weatherData,
  currentWeatherParameters,
  renderCurrentWeatherData,
  hourlyWeatherParameters,
  hourlyTimeParametersArrays,
  hourlyTimeParametersDisplay,
  createHourlyObject,
  createElementParameters,
  createHourlySection,
  dailyWeatherData,
  dailyWeatherDisplay,
  createDailyObject,
  createDailyWeatherParams,
  createDailyWeatherSection,
} from "./getWeather.js";

import { getSearchData } from "./suggestionList.js";
import { getCityData } from "./getCity.js";
import { unitsType, changeUnitsType } from "./changeUnits.js";

export const input = document.getElementById("h1__input");
input.addEventListener("input", getSearchData);

const suggestionListElement = document.querySelector(".suggestion-element");

export let temperature;
export let precip;
export let windspeed;

export let temperatureArray;
export let precipArray;
export let windspeedArray;

async function main() {
  try {
    // temperature = 0;
    // precip = 0;
    // windspeed = 0;

    // temperatureArray = [];
    // precipArray = [];
    // windspeedArray = [];
    const coordinates = await getCoordinates();
    const timeData = await getTimeData(coordinates);
    await getCityData(coordinates);
    const currentWeatherData = await weatherData(coordinates);
    const currentWeather = await currentWeatherParameters(currentWeatherData, timeData);
    renderCurrentWeatherData(currentWeather);
    const hourlyParameters = await hourlyWeatherParameters(currentWeatherData);
    const hourlyTimeArrays = await hourlyTimeParametersArrays(hourlyParameters);
    const hourlyParametersDisplay = await hourlyTimeParametersDisplay(hourlyTimeArrays, timeData);
    const hourlyObject = await createHourlyObject(hourlyParameters, hourlyParametersDisplay, timeData);
    const elementParameters = await createElementParameters();
    const hourlySection = await createHourlySection(hourlyObject, elementParameters);

    const dailyWeather = await dailyWeatherData(currentWeatherData);
    const dailyWeatherParameters = await dailyWeatherDisplay(dailyWeather, timeData);
    const dailyObject = await createDailyObject(dailyWeatherParameters);
    const dailyElementParameters = await createDailyWeatherParams();
    const dailySection = await createDailyWeatherSection(dailyObject, dailyElementParameters);
    await createArraysForUnits();

    removeSkeleton();
    hideAlertBar();
  } catch (error) {
    console.log("Error:", error.message);
    return;
  }
}

const elements = document.querySelectorAll(".skeleton");

export function removeSkeleton() {
  elements.forEach((element) => {
    element.classList.remove("skeleton", "skeleton-loading-text", "skeleton-unit-button", "skeleton-text-h1");
  });
}

export function createArraysForUnits() {
  temperature = document.querySelectorAll(".temperature");
  precip = document.querySelectorAll(".precip");
  windspeed = document.querySelectorAll(".windspeed");

  temperatureArray = Array.from(temperature);
  precipArray = Array.from(precip);
  windspeedArray = Array.from(windspeed);
}

main();
