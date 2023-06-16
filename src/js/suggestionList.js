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

import { getCityData } from "./getCity.js";

const input = document.getElementById("h1__input");
const suggestionListOnPage = document.getElementById("result");
input.removeEventListener("input", getSearchData);
input.addEventListener("input", getSearchData);

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

      hidePreloader();
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
const currentWeatherSection = document.querySelector("#current-weather__section");
const hourlyWeatherSection = document.querySelector(".hourly-forecast__section");
const dailyWeatherSection = document.querySelector("#daily-forecast");

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

const getWeatherDataForSuggestion = async (coordinates) => {
  await showPreloader();
  const timeData = await getTimeData(coordinates);
  const currentWeatherData = await weatherData(coordinates);
  const currentWeather = currentWeatherParameters(currentWeatherData, timeData);
  renderCurrentWeatherData(currentWeather);
  const hourlyParameters = hourlyWeatherParameters(currentWeatherData);
  const hourlyTimeArrays = hourlyTimeParametersArrays(hourlyParameters);
  const hourlyParametersDisplay = hourlyTimeParametersDisplay(hourlyTimeArrays, timeData);
  const hourlyObject = createHourlyObject(hourlyParameters, hourlyParametersDisplay, timeData);
  const elementParameters = createElementParameters();
  const hourlySection = createHourlySection(hourlyObject, elementParameters);

  const dailyWeather = dailyWeatherData(currentWeatherData);
  const dailyWeatherParameters = dailyWeatherDisplay(dailyWeather, timeData);
  const dailyObject = createDailyObject(dailyWeatherParameters);
  const dailyElementParameters = createDailyWeatherParams();
  const dailySection = createDailyWeatherSection(dailyObject, dailyElementParameters);
  hidePreloader();
};
