import "./getCoords.js";
import { getCoordinates } from "./getCoords.js";

const currentTempOnPage = document.getElementById("current-temp");
const currentTempHighOnPage = document.getElementById("current-high-temp");
const currentTempLowOnPage = document.getElementById("current-low-temp");
const currentTempFLHighOnPage = document.getElementById("current-fl-high-temp");
const currentTempFLLowOnPage = document.getElementById("current-fl-low-temp");
const currentWindSpeedOnPage = document.getElementById("current-windspeed");
const currentPrecipOnPage = document.getElementById("current-precip");

// const currentTempOnWebpage = document.querySelector("#current-temp");

export async function getWeather() {
  const position = await getCoordinates();
  const latitude = position.userLatitude;
  const longitude = position.userLongitude;
  const timezone = await Intl.DateTimeFormat().resolvedOptions().timeZone;

  // const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weathercode,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime&timezone=${timezone}`;
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime&timezone=${timezone}`;

  const weather = await fetch(apiUrl);
  const weatherJson = await weather.json();
  const currentTemp = weatherJson;
  return weatherJson;
}

export async function renderCurrentData() {
  const data = await getWeather();

  const {
    current_weather: currentWeather,
    daily: dailyWeather,
    hourly: hourlyWeather,
  } = data;
  const { temperature: currentTemp, windspeed: currentWindSpeed } =
    currentWeather;

  const [currentHighTemp] = dailyWeather.temperature_2m_max;
  const [currentLowTemp] = dailyWeather.temperature_2m_min;
  const [currentFLHighTemp] = dailyWeather.apparent_temperature_max;
  const [currentFLLowTemp] = dailyWeather.apparent_temperature_min;
  const [currentPrecip] = hourlyWeather.precipitation;

  currentTempOnPage.textContent = currentTemp;
  currentWindSpeedOnPage.textContent = currentWindSpeed;
  currentTempHighOnPage.textContent = currentHighTemp;
  currentTempLowOnPage.textContent = currentLowTemp;
  currentTempFLHighOnPage.textContent = currentFLHighTemp;
  currentTempFLLowOnPage.textContent = currentFLLowTemp;
  currentPrecipOnPage.textContent = currentPrecip;
}

export async function getCurrentTimeData() {
  const monthNames = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentWeekDay = weekNames[currentDate.getDay() - 1];
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  const currentTime = `${currentHour}:${currentMinute}`;
  const currentDateDisplay = `${currentWeekDay} ${currentDay} ${currentMonth} ${currentYear}`;

  document.getElementById("current-time").textContent = currentTime;
  document.getElementById("current-date").textContent = currentDateDisplay;
}
