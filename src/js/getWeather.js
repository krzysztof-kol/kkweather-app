// import "./getCoords.js";
import { getCoordinates } from "./getCoords.js";
import { passCoordinatesOnInput } from "./passCoordinatesOnInput.js";

const input = document.getElementById("h1__input");
// import { getSearchData } from "./suggestionList.js";

const currentTempOnPage = document.getElementById("current-temp");
const currentTempHighOnPage = document.getElementById("current-high-temp");
const currentTempLowOnPage = document.getElementById("current-low-temp");
const currentTempFLHighOnPage = document.getElementById("current-fl-high-temp");
const currentTempFLLowOnPage = document.getElementById("current-fl-low-temp");
const currentWindSpeedOnPage = document.getElementById("current-windspeed");
const currentPrecipOnPage = document.getElementById("current-precip");

export async function getTimeData(coordinates) {
  const locationData = coordinates;
  // console.log(coordinates.latitude);
  const latitude = locationData.latitude;
  const longitude = locationData.longitude;

  const currentTimeOnLocationData = await fetch(
    `https://api-bdc.net/data/timezone-by-location?latitude=${latitude}&longitude=${longitude}&key=bdc_50aaf13f645647f1ae8c1a4eaade70f9`
  );
  const currentTimeOnLocation = await currentTimeOnLocationData.json();
  // console.log(currentTimeOnLocation);

  const monthNames = [
    "January",
    "February",
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

  const currentDate = new Date(currentTimeOnLocation.localTime);
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentWeekDay = weekNames[currentDate.getDay()];
  let currentHour = currentDate.getHours();
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

export async function getWeather(coordinates) {
  let latitude = coordinates.latitude;
  let longitude = coordinates.longitude;
  let timezone = coordinates.timezone;
  console.log(timezone);

  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,surface_pressure,windspeed_10m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_probability_max&current_weather=true&timezone=${timezone}`;

  const weather = await fetch(apiUrl);
  const weatherJson = await weather.json();
  // console.log(weatherJson);
  return weatherJson;
}

export async function renderWeatherData(weatherData, coordinates) {
  const timeData = await getTimeData(coordinates);

  const {
    current_weather: currentWeather,
    daily: dailyWeather,
    hourly: hourlyWeather,
  } = weatherData;
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
  currentWeatherIcon.innerHTML = "";

  setWeatherIcon(currentWeatherIcon, currentWeatherCode, currentIsDay);

  currentTempOnPage.textContent = currentTemp;
  currentWindSpeedOnPage.textContent = currentWindSpeed;
  currentTempHighOnPage.textContent = currentHighTemp;
  currentTempLowOnPage.textContent = currentLowTemp;
  currentTempFLHighOnPage.textContent = currentFLHighTemp;
  currentTempFLLowOnPage.textContent = currentFLLowTemp;
  currentPrecipOnPage.textContent = currentPrecip;
}

export async function renderHourlyWeatherData(weatherData, timeData) {
  console.log(timeData);
  console.log(weatherData);
  const { hourly: hourlyWeather } = weatherData;

  const hourlySection = document.getElementsByClassName(
    "hourly-forecast__section"
  );

  let day, hour;
  let minute = "00";
  let isDayArray = hourlyWeather.is_day.splice(
    timeData.hour + 1,
    hourlyWeather.is_day.length
  );
  let weatherCodeArray = hourlyWeather.weathercode.splice(
    timeData.hour + 1,
    hourlyWeather.weathercode.length
  );

  hourlySection[0].innerHTML = "";

  hourlyWeather.temperature_2m
    .splice(timeData.hour + 1, hourlyWeather.temperature_2m.length)
    .forEach((temperature, index) => {
      function getDayAndHour() {
        hour = (timeData.hour + 1 + index) % 24;
        let actualDay =
          (timeData.dayWeek + Math.floor((timeData.hour + index + 1) / 24)) % 7;
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
        hourlyWeather.precipitation_probability[timeData.hour + 1 + index];

      const hourlyDetailPrecipSum = document.createElement("div");
      hourlyDetailPrecipSum.className = "hourly-detail hourly-detail-sum";

      const hourlyPrecipSumIcon = document.createElement("div");
      hourlyPrecipSumIcon.className = "wi hourly-icon icon-small wi-rain";

      const hourlyPrecipSum = document.createElement("div");
      hourlyPrecipSum.className =
        "hourly-precip-sum text-normal temperature__small";
      hourlyPrecipSum.textContent =
        hourlyWeather.precipitation[timeData.hour + 1 + index];

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

export async function renderDailyWeatherData(weatherData, coordinates) {
  const timeData = await getTimeData(coordinates);
  const { daily: dailyWeather } = weatherData;

  console.log(dailyWeather);

  const dailySection = document.getElementById("daily-forecast");
  const DFContainer = document.getElementById("DF__container");
  DFContainer.innerHTML = "";

  const time = dailyWeather.time;
  const weatherCode = dailyWeather.weathercode;
  const tempMax = dailyWeather.temperature_2m_max;
  const tempFLMax = dailyWeather.apparent_temperature_max;
  const tempMin = dailyWeather.temperature_2m_min;
  const tempFLMin = dailyWeather.apparent_temperature_min;
  const sunrise = dailyWeather.sunrise;
  const sunset = dailyWeather.sunset;
  const precip = dailyWeather.precipitation_sum;
  const precipProb = dailyWeather.precipitation_probability_max;

  console.log(time);

  time.forEach((dailyTime, index) => {
    let date = `${dailyTime.slice(8, 10)}.${dailyTime.slice(
      5,
      7
    )}.${dailyTime.slice(0, 4)}`;

    let dailyWeatherCode = Math.round(weatherCode[index]);
    let dailyTempMax = Math.round(tempMax[index]);
    let dailyTempFLMax = Math.round(tempFLMax[index]);
    let dailyTempMin = Math.round(tempMin[index]);
    let dailyTempFLMin = Math.round(tempFLMin[index]);
    let dailySunrise = sunrise[index].slice(11, 16);
    let dailySunset = sunset[index].slice(11, 16);
    let dailyPrecip = Math.round(precip[index]);
    let dailyPrecipProb = Math.round(precipProb[index]);
    let dailyDay = timeData.weekNames[(timeData.dayWeek + index) % 7].slice(
      0,
      3
    );

    const DFElement = document.createElement("div");
    DFElement.className = "df__element";

    const DFDataContainer1 = document.createElement("div");
    DFDataContainer1.className = "df__data-container df__data-container-main";
    const DFDataContainer2 = document.createElement("div");
    DFDataContainer2.className = "df__data-container df__data-container-data";

    const DFData1 = document.createElement("div");
    DFData1.className = "df__data";
    const DFData2 = document.createElement("div");
    DFData2.className = "df__data df__data-main";
    const DFData3 = document.createElement("div");
    DFData3.className = "df__data";
    const DFData4 = document.createElement("div");
    DFData4.className = "df__data";
    const DFData5 = document.createElement("div");
    DFData5.className = "df__data";
    const DFData6 = document.createElement("div");
    DFData6.className = "df__data";
    const DFData7 = document.createElement("div");
    DFData7.className = "df__data";
    const DFData8 = document.createElement("div");
    DFData8.className = "df__data";

    const DFDividingLine = document.createElement("div");
    DFDividingLine.className = "df_line";

    const DFIcon = document.createElement("div");
    DFIcon.className = "icon-medium wi df__icon-main";
    const DFDay = document.createElement("div");
    DFDay.className = "text-bold df__text df__day";
    const DFDate = document.createElement("div");
    DFDate.className = "df__text df__date";

    const DFTempMaxIcon = document.createElement("div");
    DFTempMaxIcon.className = "df__icon icon-small wi wi-thermometer";
    const DFTempMinIcon = document.createElement("div");
    DFTempMinIcon.className = "df__icon icon-small wi wi-thermometer-exterior";
    const DFPrecipIcon = document.createElement("div");
    DFPrecipIcon.className = "df__icon icon-small wi wi-rain";
    const DFPrecipProbIcon = document.createElement("div");
    DFPrecipProbIcon.className = "df__icon icon-small wi wi-raindrop";
    const DFSunriseIcon = document.createElement("div");
    DFSunriseIcon.className = "df__icon icon-small wi wi-sunrise";
    const DFSunsetIcon = document.createElement("div");
    DFSunsetIcon.className = "df__icon icon-small wi wi-sunset";

    const DFTempMax = document.createElement("div");
    DFTempMax.className = "df__text daily-temp";
    const DFTempMin = document.createElement("div");
    DFTempMin.className = "df__text daily-temp";
    const DFTempFLMax = document.createElement("div");
    DFTempFLMax.className = "df__text daily-temp";
    const DFTempFLMin = document.createElement("div");
    DFTempFLMin.className = "df__text daily-temp";
    const DFPrecip = document.createElement("div");
    DFPrecip.className = "df__text daily-precip";
    const DFPrecipProb = document.createElement("div");
    DFPrecipProb.className = "df__text df__precip daily-precip-prob";
    const DFSunrise = document.createElement("div");
    DFSunrise.className = "df__text";
    const DFSunset = document.createElement("div");
    DFSunset.className = "df__text";

    DFContainer.appendChild(DFElement);

    DFElement.appendChild(DFDataContainer1);
    DFElement.appendChild(DFDataContainer2);

    DFDataContainer1.appendChild(DFData1);
    DFDataContainer1.appendChild(DFData2);
    DFDataContainer2.appendChild(DFData3);
    DFDataContainer2.appendChild(DFData4);
    DFDataContainer2.appendChild(DFData5);
    DFDataContainer2.appendChild(DFData6);
    DFDataContainer2.appendChild(DFData7);
    DFDataContainer2.appendChild(DFData8);

    DFData1.appendChild(DFIcon);
    DFData2.appendChild(DFDay);
    DFData2.appendChild(DFDate);
    DFData3.appendChild(DFTempMaxIcon);
    DFData3.appendChild(DFTempMax);
    DFData4.appendChild(DFTempMinIcon);
    DFData4.appendChild(DFTempMin);
    DFData5.appendChild(DFPrecipIcon);
    DFData5.appendChild(DFPrecip);
    DFData6.appendChild(DFPrecipProbIcon);
    DFData6.appendChild(DFPrecipProb);
    DFData7.appendChild(DFSunriseIcon);
    DFData7.appendChild(DFSunrise);
    DFData8.appendChild(DFSunsetIcon);
    DFData8.appendChild(DFSunset);

    setWeatherIcon(DFIcon, dailyWeatherCode, 1);
    DFDay.textContent = dailyDay;
    DFDate.textContent = date;
    DFTempMax.textContent = dailyTempMax;
    DFTempMin.textContent = dailyTempMin;
    DFTempFLMax.textContent = dailyTempFLMax;
    DFTempFLMin.textContent = dailyTempFLMin;
    DFPrecip.textContent = dailyPrecip;
    DFPrecipProb.textContent = dailyPrecipProb;
    DFSunrise.textContent = dailySunrise;
    DFSunset.textContent = dailySunset;
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
