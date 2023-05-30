// import { getSearchData } from "./suggestionList.js";

let userLatitude, userLongitude;

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
  userLatitude = coords.coords.latitude;
  userLongitude = coords.coords.longitude;
  return { userLatitude, userLongitude };
}
