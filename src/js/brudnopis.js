function adjusth1InputHeight() {
  const h1Input = document.getElementById("h1__input");
  h1Input.style.height = "auto";
  h1Input.style.height = h1Input.scrollHeight + "px";
}

function setInitialh1InputHeight() {
  const h1Input = document.getElementById("h1__input");
  h1Input.style.height = "auto";
  h1Input.style.height = h1Input.scrollHeight + "px";
}

setInitialh1InputHeight();

function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const currentTempOnWebpage = document.querySelector("#current-temp");

async function getWeather() {
  try {
    const position = await getLocation();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const weather = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime&timezone=Europe%2FBerlin`
    );
    // console.log(weather);
    const data = await weather.json();
    const currentTemp = await data.current_weather.temperature;
    currentTempOnWebpage.textContent = currentTemp;
  } catch (error) {
    console.log("Błąd podczas pobierania lokalizacji");
  }
}

getWeather();
