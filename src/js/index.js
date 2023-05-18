import "./getCoords.js";
import { getWeather } from "./getWeather.js";
import { getCurrentTimeData } from "./getWeather.js";
import { renderCurrentData } from "./getWeather.js";
import { getCityData } from "./getCity.js";
import "./toggles.js";

renderCurrentData();
getCurrentTimeData();
setInterval(getCurrentTimeData, 60000);

// getCityData();
