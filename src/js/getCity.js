import { getCoordinates } from "./getCoords.js";

let currentCity;

// const cityDisplay = document.querySelector("#h1_input");

export async function getCityData() {
  let coordinates = await getCoordinates();
  const currentLatitude = coordinates.latitude;
  const currentLongitude = coordinates.longitude;

  const regionData = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude${currentLatitude}&longitude=${currentLongitude}&localityLanguage=pl`
  );

  const regionDataJson = await regionData.json();
  currentCity = regionDataJson.city;
  document.querySelector("#h1__input").value = currentCity;
}

// getCityData();
