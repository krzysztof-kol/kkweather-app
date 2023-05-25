import "./getCoords.js";
import { getWeather } from "./getWeather.js";
import { getTimeData } from "./getWeather.js";
import { renderWeatherData } from "./getWeather.js";
import { renderHourlyWeatherData } from "./getWeather.js";
import { renderDailyWeatherData } from "./getWeather.js";
import { getCityData } from "./getCity.js";
import "./toggles.js";
import { getCoordinates } from "./getCoords.js";

getCoordinates();
getTimeData();
getWeather();
renderWeatherData();
renderHourlyWeatherData();
renderDailyWeatherData();
getCityData();

setInterval(getTimeData, 60000);

// getCityData();
