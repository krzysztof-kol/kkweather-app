import { getCoordinates } from "./getCoords.js";
import { getWeather } from "./getWeather.js";
import { getTimeData } from "./getWeather.js";
import { renderWeatherData } from "./getWeather.js";
import { renderHourlyWeatherData } from "./getWeather.js";
import { renderDailyWeatherData } from "./getWeather.js";
import { getCityData } from "./getCity.js";
import "./toggles.js";
import { getSearchData } from "./suggestionList.js";

const input = document.getElementById("h1__input");
input.addEventListener("input", getSearchData);
const suggestionListElement = document.querySelector(".suggestion-element");

async function main() {
  let coordinates = await getCoordinates();
  console.log(coordinates);
  const weatherData = await getWeather(coordinates);
  const timeData = await getTimeData(coordinates);
  //
  await renderWeatherData(weatherData, coordinates);
  await renderHourlyWeatherData(weatherData, timeData);
  await renderDailyWeatherData(weatherData, coordinates);
  await getCityData();
  //   setInterval(getTimeData, 60000);
}

main();
