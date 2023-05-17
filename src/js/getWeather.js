// const successCallback = (position) => {
//   console.log(position);
// };

// const errorCallback = (error) => {
//   console.error("Nie udało się pobrać lokalizacji");
// };

// export function getLocation() {
//   return new Promise((successCallback, errorCallback) => {
//     navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
//   });
// }

// const currentTempOnWebpage = document.querySelector("#current-temp");

// async function getWeather() {
//   try {
//     const position = await getLocation();
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;

//     const timezone = await Intl.DateTimeFormat().resolvedOptions().timeZone;

//     const weather = await fetch(
//       `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime&timezone=${timezone}`
//     );
//     // console.log(weather);
//     const data = await weather.json();
//     console.log(data);
//     const currentTemp = await data.current_weather.temperature;
//     currentTempOnWebpage.textContent = currentTemp;
//   } catch (error) {
//     console.log("Błąd podczas pobierania lokalizacji");
//   }
// }

// getWeather();

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
  const currentWeather = data.current_weather;
  const dailyWeather = data.daily;

  const currentTemp = currentWeather.temperature;
  currentTempOnPage.textContent = currentTemp;

  const currentWindSpeed = currentWeather.windspeed;
  currentWindSpeedOnPage.textContent = currentWindSpeed;

  const currentHighTemp = dailyWeather.temperature_2m_max[0];
  currentTempHighOnPage.textContent = currentHighTemp;

  const currentLowTemp = dailyWeather.temperature_2m_min[0];
  currentTempLowOnPage.textContent = currentLowTemp;

  const currentFLHighTemp = dailyWeather.apparent_temperature_max[0];
  currentTempFLHighOnPage.textContent = currentFLHighTemp;

  const currentFLLowTemp = dailyWeather.apparent_temperature_min[0];
  currentTempFLLowOnPage.textContent = currentFLLowTemp;

  const currentPrecip = dailyWeather.apparent_temperature_min[0];
  currentPrecipOnPage.textContent = currentPrecip;
}

// renderCurrentData();
