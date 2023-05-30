import "./getCoords.js";
import { getWeather } from "./getWeather.js";
import { getTimeData } from "./getWeather.js";
import { renderWeatherData } from "./getWeather.js";
import { renderHourlyWeatherData } from "./getWeather.js";
import { renderDailyWeatherData } from "./getWeather.js";
import { getCityData } from "./getCity.js";
import "./toggles.js";
import { getCoordinates } from "./getCoords.js";
import { adjusth1InputHeight } from "./adjustHeights.js";
// import { getSearchData } from "./suggestionList.js";
import { passCoordinatesOnInput } from "./passCoordinatesOnInput.js";

async function main() {
  await getCoordinates();
  await getTimeData();
  // getWeather();
  renderWeatherData();
  renderHourlyWeatherData();
  renderDailyWeatherData();
  getCityData();
  // getCitySuggestionList();

  setInterval(getTimeData, 60000);

  // getCityData();
}

main();
