import "./getCoords.js";
import { getWeather } from "./getWeather.js";
import { getTimeData } from "./getWeather.js";
import { renderWeatherData } from "./getWeather.js";
import { renderHourlyWeatherData } from "./getWeather.js";
import { getCityData } from "./getCity.js";
import "./toggles.js";

getTimeData();
getWeather();

renderWeatherData();
renderHourlyWeatherData();
getCityData();

setInterval(getTimeData, 60000);

// getCityData();
