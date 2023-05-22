import "./getCoords.js";
import { getCoordinates } from "./getCoords.js";

const currentTempOnPage = document.getElementById("current-temp");
const currentTempHighOnPage = document.getElementById("current-high-temp");
const currentTempLowOnPage = document.getElementById("current-low-temp");
const currentTempFLHighOnPage = document.getElementById("current-fl-high-temp");
const currentTempFLLowOnPage = document.getElementById("current-fl-low-temp");
const currentWindSpeedOnPage = document.getElementById("current-windspeed");
const currentPrecipOnPage = document.getElementById("current-precip");

export async function getWeather() {
  const position = await getCoordinates();
  const latitude = position.userLatitude;
  const longitude = position.userLongitude;
  const timezone = await Intl.DateTimeFormat().resolvedOptions().timeZone;

  // const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weathercode,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime&timezone=${timezone}`;
  // const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime&timezone=${timezone}`;
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,windspeed_10m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum&current_weather=true&timeformat=unixtime&timezone=${timezone}`;
  // const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,surface_pressure,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum&current_weather=true&timeformat=unixtime&timezone=${timezone}`;

  const weather = await fetch(apiUrl);
  const weatherJson = await weather.json();
  // const currentTemp = weatherJson;
  return weatherJson;
}

export async function renderWeatherData() {
  const data = await getWeather();
  const timeData = await getTimeData();

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
  const currentPrecip = hourlyWeather.precipitation[timeData.hour];
  const currentWeatherCode = currentWeather.weathercode;
  const currentIsDay = currentWeather.is_day;
  const currentWeatherIcon = document.querySelector(".current-weather-icon");

  setWeatherIcon(currentWeatherIcon, currentWeatherCode, currentIsDay);

  currentTempOnPage.textContent = currentTemp;
  currentWindSpeedOnPage.textContent = currentWindSpeed;
  currentTempHighOnPage.textContent = currentHighTemp;
  currentTempLowOnPage.textContent = currentLowTemp;
  currentTempFLHighOnPage.textContent = currentFLHighTemp;
  currentTempFLLowOnPage.textContent = currentFLLowTemp;
  currentPrecipOnPage.textContent = currentPrecip;
}

export async function getTimeData() {
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
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentWeekDay = weekNames[currentDate.getDay()];
  const currentHour = currentDate.getHours();
  let currentMinute = currentDate.getMinutes();
  let hour = currentDate.getHours();
  let dayWeek = currentDate.getDay();

  if (currentMinute < 10) currentMinute = "0" + currentMinute;
  if (currentHour < 10) currentHour = "0" + currentHour;

  const currentTime = `${currentHour}:${currentMinute}`;
  const currentDateDisplay = `${currentWeekDay} ${currentDay} ${currentMonth} ${currentYear}`;

  document.getElementById("current-time").textContent = currentTime;
  document.getElementById("current-date").textContent = currentDateDisplay;

  return { weekNames, currentWeekDay, dayWeek, hour, currentMinute };
}

export async function renderHourlyWeatherData() {
  const hourlyData = await getWeather();
  const timeData = await getTimeData();

  const { hourly: hourlyWeather } = hourlyData;

  const hourlySection = document.getElementsByClassName(
    "hourly-forecast__section"
  );

  console.log(hourlyWeather);
  let day, hour;
  let minute = "00";
  console.log(hourlyData.hourly.is_day);
  let isDayArray = hourlyWeather.is_day.splice(
    timeData.hour + 1,
    hourlyWeather.is_day.length
  );
  let weatherCodeArray = hourlyWeather.weathercode.splice(
    timeData.hour + 1,
    hourlyWeather.weathercode.length
  );
  console.log(weatherCodeArray);
  // let weatherIconClass;

  hourlyWeather.temperature_2m
    .splice(timeData.hour + 1, hourlyWeather.temperature_2m.length)
    .forEach((temperature, index) => {
      function getDayAndHour() {
        // console.log(hourlyWeather.temperature_2m);
        hour = (timeData.hour + 1 + index) % 24;

        let actualDay =
          (timeData.dayWeek + Math.floor((timeData.hour + index) / 24)) % 7;
        day = timeData.weekNames[actualDay];
        return [hour, day];
      }

      [hour, day] = getDayAndHour();
      day = day.slice(0, 3);
      let weatherCode = weatherCodeArray[index];
      let isDay = isDayArray[index];
      // console.log(isDayArray);
      // console.log(hour);

      // getWeatherIcon();

      const hourlyForecastElement = document.createElement("div");
      hourlyForecastElement.className = "hourly-forecast__element";

      const hourlyDetailDay = document.createElement("div");
      hourlyDetailDay.className = "hourly-detail hourly-detail-day";

      const hourlyDay = document.createElement("div");
      hourlyDay.className = "hourly-day text-normal text-bold";
      hourlyDay.textContent = day;

      const hourlyDetailTime = document.createElement("div");
      hourlyDetailTime.className = "hourly-detail hourly-detail-time";

      const hourlyTimeIcon = document.createElement("div");
      hourlyTimeIcon.className = "wi hourly-icon icon-small";
      setWeatherIcon(hourlyTimeIcon, weatherCode, isDay);

      const hourlyTime = document.createElement("div");
      hourlyTime.className = "hourly-time text-normal";
      hourlyTime.textContent = `${hour}:${minute}`;

      const hourlyDetailTemp = document.createElement("div");
      hourlyDetailTemp.className = "hourly-detail hourly-detail-temp";

      const hourlyTempIcon = document.createElement("div");
      hourlyTempIcon.className =
        "wi hourly-icon icon-small wi-thermometer-exterior";

      const hourlyTemp = document.createElement("div");
      hourlyTemp.className = "hourly-temp text-normal temperature__small";
      hourlyTemp.textContent = temperature;

      const hourlyDetailPrecipProb = document.createElement("div");
      hourlyDetailPrecipProb.className = "hourly-detail hourly-detail-prob";

      const hourlyPrecipProbIcon = document.createElement("div");
      hourlyPrecipProbIcon.className = "wi hourly-icon icon-small wi-humidity";

      const hourlyPrecipProb = document.createElement("div");
      hourlyPrecipProb.className =
        "hourly-precip-probability text-normal temperature__small";
      hourlyPrecipProb.textContent =
        hourlyWeather.precipitation_probability[timeData.hour + 1];

      const hourlyDetailPrecipSum = document.createElement("div");
      hourlyDetailPrecipSum.className = "hourly-detail hourly-detail-sum";

      const hourlyPrecipSumIcon = document.createElement("div");
      hourlyPrecipSumIcon.className = "wi hourly-icon icon-small wi-rain";

      const hourlyPrecipSum = document.createElement("div");
      hourlyPrecipSum.className =
        "hourly-precip-sum text-normal temperature__small";
      hourlyPrecipSum.textContent = hourlyWeather.precipitation[index + 9];

      // const weatherIcon = hourlyTimeIcon;

      hourlySection[0].appendChild(hourlyForecastElement);
      hourlyForecastElement.appendChild(hourlyDetailDay);
      hourlyDetailDay.appendChild(hourlyDay);

      hourlyForecastElement.appendChild(hourlyDetailTime);
      hourlyDetailTime.appendChild(hourlyTimeIcon);
      hourlyDetailTime.appendChild(hourlyTime);

      hourlyForecastElement.appendChild(hourlyDetailTemp);
      hourlyDetailTemp.appendChild(hourlyTempIcon);
      hourlyDetailTemp.appendChild(hourlyTemp);

      hourlyForecastElement.appendChild(hourlyDetailPrecipProb);
      hourlyDetailPrecipProb.appendChild(hourlyPrecipProbIcon);
      hourlyDetailPrecipProb.appendChild(hourlyPrecipProb);

      hourlyForecastElement.appendChild(hourlyDetailPrecipSum);
      hourlyDetailPrecipSum.appendChild(hourlyPrecipSumIcon);
      hourlyDetailPrecipSum.appendChild(hourlyPrecipSum);
    });
}

function setWeatherIcon(element, weatherCode, isDay) {
  let weatherIconClass;
  switch (weatherCode) {
    case 0:
      weatherIconClass = isDay ? "wi-day-sunny" : "wi-night-clear";
      break;
    case 1:
    case 2:
    case 3:
      weatherIconClass = isDay ? "wi-day-cloudy" : "wi-night-alt-cloudy";
      break;
    case 45:
    case 48:
      weatherIconClass = isDay ? "wi-day-fog" : "wi-night-fog";
      break;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      weatherIconClass = isDay ? "wi-day-sleet" : "wi-night-sleet";
      break;
    case 61:
    case 63:
    case 65:
      weatherIconClass = isDay ? "wi-day-rain" : "wi-night-alt-rain";
      break;
    case 66:
    case 67:
      weatherIconClass = isDay ? "wi-day-sleet" : "wi-night-sleet";
      break;
    case 71:
    case 73:
    case 75:
    case 77:
      weatherIconClass = isDay ? "wi-day-snow" : "wi-night-alt-snow";
      break;
    case 80:
    case 81:
    case 82:
      weatherIconClass = isDay ? "wi-day-showers" : "wi-night-alt-showers";
      break;
    case 85:
    case 86:
      weatherIconClass = isDay ? "wi-day-snow" : "wi-night-alt-snow";
      break;
    case 95:
    case 96:
    case 99:
      weatherIconClass = isDay
        ? "wi-day-thunderstorm"
        : "wi-night-thunderstorm";
      break;
    default:
      weatherIconClass = isDay ? "wi-day-sunny" : "wi-night-clear";
      break;
  }

  element.classList.add(weatherIconClass);
}
