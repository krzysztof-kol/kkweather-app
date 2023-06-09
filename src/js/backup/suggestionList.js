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

const input = document.getElementById("h1__input");
const suggestionListOnPage = document.getElementById("result");
// input.addEventListener("input", getSearchData);

let searchSuggestionList = [];
let suggestionData = {};
let coordinates = {};

export async function getSearchData(val) {
  let userInput = encodeURIComponent(input.textContent);

  const data = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${userInput}&count=3&language=en&format=json`);
  const dataJson = await data.json();
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

  console.log(searchSuggestionList);
  suggestionListOnPage.innerHTML = "";
  addElementsToSuggestionList(searchSuggestionList);
}

export function addElementsToSuggestionList(elements) {
  const suggestionList = document.createElement("ul");
  suggestionList.className = "suggestion-list";
  suggestionListOnPage.appendChild(suggestionList);

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

//pokazanie i schowanie preloader'a

const preloader = document.querySelector(".preloader");
const currentWeatherSection = document.querySelector(".current-weather__section");
const hourlyWeatherSection = document.querySelector(".hourly-forecast__section");
const dailyWeatherSection = document.querySelector("#daily-forecast");

function showPreloader() {
  preloader.setAttribute("display", "block");
  input.setAttribute("width", "fit-content");
  currentWeatherSection.setAttribute("opacity", ".8");
  hourlyWeatherSection.setAttribute("opacity", ".8");
  dailyWeatherSection.setAttribute("opacity", ".8");
}

function hidePreloader() {
  preloader.setAttribute("display", "none");
}

async function main(coordinates) {
  const timeData = await getTimeData(coordinates);
  getCityData(coordinates);
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
}

//zapytać Łukasza o to jak było z promisem
