// import { getCoordinates } from "./getCoords.js";
// import { getWeather } from "./getWeather.js";
// import { getTimeData } from "./getWeather.js";
// import { renderWeatherData } from "./getWeather.js";
// import { renderHourlyWeatherData } from "./getWeather.js";
// import { renderDailyWeatherData } from "./getWeather.js";

// const input = document.getElementById("h1__input");
// const suggestionListOnPage = document.getElementById("result");
// // input.addEventListener("input", getSearchData);

// let searchSuggestionList = [];
// let suggestionData = {};
// let coordinates = {};

// export async function getSearchData(val) {
//   let userInput = input.value;
//   let encodedInput = encodeURIComponent(userInput);
//   const data = await fetch(
//     `https://geocoding-api.open-meteo.com/v1/search?name=${encodedInput}&count=3&language=en&format=json`
//   );
//   const dataJson = await data.json();
//   searchSuggestionList = [];

//   const suggestionArray = dataJson.results;
//   if (dataJson.results) {
//     suggestionArray.forEach((element) => {
//       const suggestion = {
//         name: element.name,
//         latitude: element.latitude,
//         longitude: element.longitude,
//         timezone: element.timezone,
//         country: element.country,
//         region: element.admin1,
//       };

//       searchSuggestionList.push(suggestion);
//     });
//   }

//   console.log(searchSuggestionList);
//   suggestionListOnPage.innerHTML = "";
//   addElementsToSuggestionList(searchSuggestionList);
// }

// export function addElementsToSuggestionList(elements) {
//   const suggestionList = document.createElement("ul");
//   suggestionList.className = "suggestion-list";
//   suggestionListOnPage.appendChild(suggestionList);

//   const clickPromise = new Promise((resolve) => {
//     elements.forEach((element) => {
//       const suggestionElement = document.createElement("li");
//       suggestionElement.className = "suggestion-element";
//       suggestionList.appendChild(suggestionElement);

//       suggestionElement.addEventListener("click", async () => {
//         input.value = element.name;
//         suggestionListOnPage.innerHTML = "";

//         suggestionData.latitude = element.latitude;
//         suggestionData.longitude = element.longitude;
//         suggestionData.timezone = element.timezone;

//         coordinates = { ...suggestionData };

//         resolve(coordinates);
//       });

//       if (element.region) {
//         suggestionElement.textContent = `${element.name}, ${element.region}, ${element.country}`;
//       } else {
//         suggestionElement.textContent = `${element.name}, ${element.country}`;
//       }
//     });
//   });

//   clickPromise
//     .then((data) => {
//       coordinates = data;
//       console.log(coordinates);
//       return coordinates;
//     })
//     .then(async (coordinates) => {
//       console.log(coordinates);
//       const timeData = await getTimeData(coordinates);
//       console.log(timeData.hour + 1);
//       const weatherData = await getWeather(coordinates);
//       console.log(weatherData);
//       await renderWeatherData(weatherData, coordinates);

//       console.log(timeData);
//       await renderHourlyWeatherData(weatherData, timeData);
//       await renderDailyWeatherData(weatherData, coordinates);
//       setInterval(getTimeData, 60000);
//     });
// }

import { getCoordinates } from "./getCoords.js";
import { getWeather } from "./getWeather.js";
import { getTimeData } from "./getWeather.js";
import { renderWeatherData } from "./getWeather.js";
import { renderHourlyWeatherData } from "./getWeather.js";
import { renderDailyWeatherData } from "./getWeather.js";

const input = document.getElementById("h1__input");
const suggestionListOnPage = document.getElementById("result");
// input.addEventListener("input", getSearchData);

let searchSuggestionList = [];
let suggestionData = {};
let coordinates = {};

export async function getSearchData(val) {
  let userInput = encodeURIComponent(input.textContent);

  const data = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${userInput}&count=3&language=en&format=json`
  );
  const dataJson = await data.json();
  searchSuggestionList = [];

  const suggestionArray = dataJson.results;
  if (dataJson.results) {
    suggestionArray.forEach((element) => {
      const suggestion = {
        name: element.name,
        latitude: element.latitude,
        longitude: element.longitude,
        timezone: element.timezone,
        country: element.country,
        region: element.admin1,
      };

      searchSuggestionList.push(suggestion);
    });
  }

  console.log(searchSuggestionList);
  suggestionListOnPage.innerHTML = "";
  addElementsToSuggestionList(searchSuggestionList);
}

export function addElementsToSuggestionList(elements) {
  const suggestionList = document.createElement("ul");
  suggestionList.className = "suggestion-list";
  suggestionListOnPage.appendChild(suggestionList);

  elements.forEach((element) => {
    const suggestionElement = document.createElement("li");
    suggestionElement.className = "suggestion-element";
    suggestionList.appendChild(suggestionElement);

    suggestionElement.addEventListener("click", async () => {
      input.textContent = element.name;
      suggestionListOnPage.innerHTML = "";

      suggestionData.latitude = element.latitude;
      suggestionData.longitude = element.longitude;
      suggestionData.timezone = element.timezone;

      coordinates = { ...suggestionData };

      getWeatherDataForSuggestion(coordinates);
    });

    if (element.region) {
      suggestionElement.textContent = `${element.name}, ${element.region}, ${element.country}`;
    } else {
      suggestionElement.textContent = `${element.name}, ${element.country}`;
    }
  });
}

const getWeatherDataForSuggestion = async (coordinates) => {
  const timeData = await getTimeData(coordinates);
  const weatherData = await getWeather(coordinates);
  await renderWeatherData(weatherData, coordinates);
  await renderHourlyWeatherData(weatherData, timeData);
  await renderDailyWeatherData(weatherData, coordinates);
  setInterval(getTimeData(coordinates), 60000);
};

//zapytać Łukasza o to jak było z promisem
