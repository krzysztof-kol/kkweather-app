import { getCoordinates } from "./getCoords.js";
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

import { hideAlertBar } from "./renderingWithoutLocation.js";
import { createArraysForUnits, input } from "./index.js";
import { unitsType, isImperial, changeUnitsType, changeUnitsToImperial, changeUnitsToNormal } from "./changeUnits.js";

// const input = document.getElementById("h1__input");
const searchField = document.querySelector("search-field-input");
const suggestionListOnPage = document.getElementById("result");
input.removeEventListener("input", getSearchData);
input.addEventListener("input", getSearchData);

let previousValue = "";

input.addEventListener("click", () => {
  if (input.textContent !== "") {
    previousValue = input.textContent;
    input.textContent = "";
  } else if (input.textContent === "") {
    return;
  }
});

input.addEventListener("blur", () => {
  input.textContent = previousValue;
});

export const currentWeatherSection = document.querySelector("#current-weather__section");
export const hourlyWeatherSection = document.querySelector(".hourly-forecast__section");
export const dailyWeatherSection = document.querySelector("#daily-forecast");

let searchSuggestionList = [];
let suggestionData = {};
let coordinates = {};

export async function getSearchData(val) {
  let userInput = encodeURIComponent(input.textContent);

  const data = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${userInput}&count=3&language=en&format=json`);
  const dataJson = await data.json();

  suggestionListOnPage.innerHTML = "";
  searchSuggestionList = [];

  const suggestionArray = dataJson.results;
  if (dataJson.results) {
    suggestionArray.forEach((element) => {
      const suggestion = {
        name: element.name,
        latitude: element.latitude,
        longitude: element.longitude,
        timezone: element.timezone,
        country: element.country,
        region: element.admin1,
      };

      searchSuggestionList.push(suggestion);
    });
  }

  addElementsToSuggestionList(searchSuggestionList);
}

export function addElementsToSuggestionList(elements) {
  const suggestionList = document.createElement("ul");
  suggestionList.className = "suggestion-list";
  suggestionListOnPage.appendChild(suggestionList);

  while (suggestionList.firstChild) {
    suggestionList.firstChild.remove();
  }

  elements.forEach((element) => {
    const suggestionElement = document.createElement("li");
    suggestionElement.className = "suggestion-element";
    suggestionList.appendChild(suggestionElement);

    suggestionElement.addEventListener("click", async () => {
      input.textContent = element.name;
      suggestionListOnPage.innerHTML = "";

      suggestionData.latitude = element.latitude;
      suggestionData.longitude = element.longitude;
      suggestionData.timezone = element.timezone;

      coordinates = { ...suggestionData };

      showPreloader();
      getWeatherDataForSuggestion(coordinates);
      if (isImperial === true) changeUnitsToImperial();
    });

    if (element.region) {
      suggestionElement.textContent = `${element.name}, ${element.region}, ${element.country}`;
    } else {
      suggestionElement.textContent = `${element.name}, ${element.country}`;
    }
  });
}

const preloader = document.querySelector(".preloader");

function showPreloader() {
  preloader.style["display"] = "block";
  input.style["width"] = "fit-content";
  currentWeatherSection.style["opacity"] = "0.2";
  hourlyWeatherSection.style["opacity"] = "0.2";
  dailyWeatherSection.style["opacity"] = "0.2";
}

function hidePreloader() {
  preloader.style["display"] = "none";
  input.style["width"] = "100%";
  currentWeatherSection.style["opacity"] = "1";
  hourlyWeatherSection.style["opacity"] = "1";
  dailyWeatherSection.style["opacity"] = "1";
}

// przełączanie sugestii strzałkami

let suggestions = document.getElementsByClassName("suggestion-element");

let selectionIndex = -1;

input.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    selectionIndex = selectionIndex > 0 ? selectionIndex - 1 : suggestions.length - 1;
    highlightSelectedSuggestion();
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    selectionIndex = selectionIndex < suggestions.length - 1 ? selectionIndex + 1 : 0;
    highlightSelectedSuggestion();
  } else if (e.key === "Enter") {
    e.preventDefault();
    // input.blur();

    if (selectionIndex >= 0) {
      const selectedSuggestion = suggestions[selectionIndex];
      const element = searchSuggestionList[selectionIndex];
      input.textContent = element.name;
      suggestionListOnPage.innerHTML = "";

      suggestionData.latitude = element.latitude;
      suggestionData.longitude = element.longitude;
      suggestionData.timezone = element.timezone;

      coordinates = { ...suggestionData };

      console.log(searchSuggestionList);

      showPreloader();
      getWeatherDataForSuggestion(coordinates);
      previousValue = input.textContent;

      selectionIndex = -1;
    }
  }
});

function highlightSelectedSuggestion() {
  for (let i = 0; i < suggestions.length; i++) {
    if (i === selectionIndex) {
      suggestions[i].classList.add("selected");
    } else suggestions[i].classList.remove("selected");
  }
}

export let temperature;
export let precip;
export let windspeed;

export let temperatureArray;
export let precipArray;
export let windspeedArray;

const getWeatherDataForSuggestion = async (coordinates) => {
  try {
    temperature = 0;
    precip = 0;
    windspeed = 0;

    temperatureArray = [];
    precipArray = [];
    windspeedArray = [];
    await showPreloader();
    const timeData = await getTimeData(coordinates);
    // await getCityData(coordinates);
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

    hidePreloader();

    hideAlertBar();
  } catch (error) {
    console.log("Error:", error.message);
    return;
  }

  await changeUnitsType();
};
