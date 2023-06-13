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
  removeSkeleton();
}

const elements = document.querySelectorAll(".skeleton");

function removeSkeleton() {
  elements.forEach((element) => {
    element.classList.remove("skeleton");
  });
}

main();
