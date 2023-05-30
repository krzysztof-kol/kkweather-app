// import { getSearchData } from "./suggestionList.js";

let latitude, longitude, timezone;

const success = (pos) => {
  const coords = pos.coords;
  console.log(coords);
};

const error = (err) => {
  console.log(err);
};

function getLocation() {
  return new Promise((success, error) => {
    navigator.geolocation.getCurrentPosition(success, error);
  });
}

export async function getCoordinates() {
  const coords = await getLocation();
  latitude = coords.coords.latitude;
  longitude = coords.coords.longitude;
  timezone = await Intl.DateTimeFormat().resolvedOptions().timeZone;
  let coordinates = { latitude, longitude, timezone };
  return coordinates;
}
