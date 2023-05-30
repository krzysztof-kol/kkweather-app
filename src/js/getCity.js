import { getCoordinates } from "./getCoords.js";

let currentCity;

// const cityDisplay = document.querySelector("#h1_input");

export async function getCityData() {
  const currentRegion = await getCoordinates();
  const currentLatitude = currentRegion.userLatitude;
  const currentLongitude = currentRegion.userLongitude;

  const regionData = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude${currentLatitude}&longitude=${currentLongitude}&localityLanguage=pl`
  );

  const regionDataJson = await regionData.json();
  currentCity = regionDataJson.city;
  document.querySelector("#h1__input").value = currentCity;
}

// getCityData();
