import { getLocation } from "./getWeather.js";

let currentCity;

// const cityDisplay = document.querySelector("#h1_input");

async function getCityData() {
  const currentRegion = await getLocation();
  const currentLatitude = currentRegion.coords.latitude;
  const currentLongitude = currentRegion.coords.longitude;

  const regionData = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude${currentLatitude}&longitude=${currentLongitude}&localityLanguage=en`
  );

  const regionDataJson = await regionData.json();
  currentCity = regionDataJson.city;
  document.querySelector("#h1__input").textContent = currentCity;
}

getCityData();
