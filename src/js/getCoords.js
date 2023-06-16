// import { showAlertBar } from "./renderingWithoutLocation.js";
// import { alertBar } from "./renderingWithoutLocation.js";

import { removeSkeleton } from "./index.js";
import { currentWeatherSection, hourlyWeatherSection, dailyWeatherSection } from "./suggestionList.js";

let alertBar = document.querySelector(".location-permission-info");

export function showAlertBar() {
  alertBar.style["opacity"] = "1";
  removeSkeleton();
  currentWeatherSection.style["opacity"] = "0";
  hourlyWeatherSection.style["opacity"] = "0";
  dailyWeatherSection.style["opacity"] = "0";
}

export const hideAlertBar = () => {
  alertBar.style["opacity"] = "0";
};

let latitude, longitude, timezone;

function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function handleLocationError(error, alert) {
  if (error.code === 1) {
    showAlertBar();
    // console.log(error);
  } else {
    // Obsłuż inne błędy lokalizacji
    console.log("Error retrieving location:", error);
  }
}

export async function getCoordinates() {
  try {
    const position = await getLocation();
    const coords = position.coords;
    latitude = coords.latitude;
    longitude = coords.longitude;
    timezone = await Intl.DateTimeFormat().resolvedOptions().timeZone;
    let coordinates = { latitude, longitude, timezone };
    return coordinates;
  } catch (err) {
    handleLocationError(err);
    throw err;
  }
}
