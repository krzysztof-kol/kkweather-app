import "./toggles.js";
import "./adjustHeights.js";
import "./getWeather.js";
import "./getCity.js";

// const hourlyForecastButton = document.querySelector(".btn");
// const hourlySection = document.querySelector(".hourly-forecast__section");
// const buttonHourlyIcon = document.querySelector(".btn__icon");
// hourlyForecastButton.addEventListener("click", toggleHourlyForecast);
// hourlyForecastButton.addEventListener("click", toggleHourlyForecast);
// hourlyForecastButton.addEventListener("click", toggleHourlyForecast);

// function toggleHourlyForecast() {
//   hourlySection.classList.toggle("active");
//   hourlyForecastButton.classList.toggle("btn-active");
//   buttonHourlyIcon.classList.toggle("btn__icon-active");
// }

// function toggleButton() {
//   hourlyForecastButton.classList.toggle("active");
// }

// function adjusth1InputHeight() {
//   const h1Input = document.getElementById("h1__input");
//   h1Input.style.height = "auto";
//   h1Input.style.height = h1Input.scrollHeight + "px";
// }

// function setInitialh1InputHeight() {
//   const h1Input = document.getElementById("h1__input");
//   h1Input.style.height = "auto";
//   h1Input.style.height = h1Input.scrollHeight + "px";
// }

// adjusth1InputHeight();
// setInitialh1InputHeight();

// const successCallback = (position) => {
//   console.log(position);
// };

// const errorCallback = (error) => {
//   console.error("Nie udało się pobrać lokalizacji");
// };

// function getLocation() {
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
