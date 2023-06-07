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

import { getSearchData } from "./suggestionList.js";
import { getCityData } from "./getCity.js";

const input = document.getElementById("h1__input");
input.addEventListener("input", getSearchData);
const suggestionListElement = document.querySelector(".suggestion-element");

async function main() {
  const coordinates = await getCoordinates();
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

main();
