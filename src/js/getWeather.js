const successCallback = (position) => {
  console.log(position);
};

const errorCallback = (error) => {
  console.error("Nie udało się pobrać lokalizacji");
};

export function getLocation() {
  return new Promise((successCallback, errorCallback) => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  });
}

const currentTempOnWebpage = document.querySelector("#current-temp");

async function getWeather() {
  try {
    const position = await getLocation();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const timezone = await Intl.DateTimeFormat().resolvedOptions().timeZone;

    const weather = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime&timezone=${timezone}`
    );
    // console.log(weather);
    const data = await weather.json();
    console.log(data);
    const currentTemp = await data.current_weather.temperature;
    currentTempOnWebpage.textContent = currentTemp;
  } catch (error) {
    console.log("Błąd podczas pobierania lokalizacji");
  }
}

getWeather();
