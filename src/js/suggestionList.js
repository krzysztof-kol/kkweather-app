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

const input = document.getElementById("h1__input");
const suggestionListOnPage = document.getElementById("result");
input.removeEventListener("input", getSearchData);
input.addEventListener("input", getSearchData);

let previousValue;
let cityName;

input.addEventListener("focus", () => {
  if (input.textContent !== "") {
    previousValue = input.textContent;
    input.textContent = "";
  }

  if (input.textContent.trim() === "") {
    return;
  }
});

input.addEventListener("blur", () => {
  if (input.textContent === "") {
    input.textContent = previousValue;
  } else {
    return;
  }
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
    await showPreloader();
    const timeData = await getTimeData(coordinates);
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
    hidePreloader();
    hideAlertBar();
    temperature = document.querySelectorAll(".temperature");
    precip = document.querySelectorAll(".precip");
    windspeed = document.querySelectorAll(".windspeed");

    temperatureArray = Array.from(temperature);
    precipArray = Array.from(precip);
    windspeedArray = Array.from(windspeed);
    // console.log(temperatureArray);
  } catch (error) {
    console.log("Error:", error.message);
    return;
  }
};
