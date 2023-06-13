export function setWeatherIcon(element, weatherCode, isDay) {
  let weatherIconClass;
  switch (weatherCode) {
    case 0:
      weatherIconClass = isDay ? "wi-day-sunny" : "wi-night-clear";
      break;
    case 1:
    case 2:
    case 3:
      weatherIconClass = isDay ? "wi-day-cloudy" : "wi-night-alt-cloudy";
      break;
    case 45:
    case 48:
      weatherIconClass = isDay ? "wi-day-fog" : "wi-night-fog";
      break;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      weatherIconClass = isDay ? "wi-day-sleet" : "wi-night-sleet";
      break;
    case 61:
    case 63:
    case 65:
      weatherIconClass = isDay ? "wi-day-rain" : "wi-night-alt-rain";
      break;
    case 66:
    case 67:
      weatherIconClass = isDay ? "wi-day-sleet" : "wi-night-sleet";
      break;
    case 71:
    case 73:
    case 75:
    case 77:
      weatherIconClass = isDay ? "wi-day-snow" : "wi-night-alt-snow";
      break;
    case 80:
    case 81:
    case 82:
      weatherIconClass = isDay ? "wi-day-showers" : "wi-night-alt-showers";
      break;
    case 85:
    case 86:
      weatherIconClass = isDay ? "wi-day-snow" : "wi-night-alt-snow";
      break;
    case 95:
    case 96:
    case 99:
      weatherIconClass = isDay ? "wi-day-thunderstorm" : "wi-night-thunderstorm";
      break;
    default:
      weatherIconClass = isDay ? "wi-day-sunny" : "wi-night-clear";
      break;
  }

  element.classList.add(weatherIconClass);
}

export function setWeatherDescription(element, weatherCode, isDay) {
  let weatherDescriptionContent;
  switch (weatherCode) {
    case 0:
      weatherDescriptionContent = isDay ? "is sunny" : "is clear sky night";
      break;
    case 1:
      weatherDescriptionContent = isDay ? "is mostly sunny" : "is mainly clear";
      break;
    case 2:
      weatherDescriptionContent = "is partly cloudy";
      break;
    case 3:
      weatherDescriptionContent = "is overcast";
      break;
    case 45:
      weatherDescriptionContent = "is foggy";
      break;
    case 48:
      weatherDescriptionContent = "is foggy with depositing rime fog";
      break;
    case 51:
      weatherDescriptionContent = "is drizzling with light intesity";
      break;
    case 53:
      weatherDescriptionContent = "is drizzling with moderate intesity";
      break;
    case 55:
      weatherDescriptionContent = "is drizzling with heavy intesity";
      break;
    case 56:
      weatherDescriptionContent = "is freezing drizzle with light intensity";
      break;
    case 57:
      weatherDescriptionContent = "is freezing drizzle with heavy intensity";
      break;
    case 61:
      weatherDescriptionContent = "is raining with light intesity";
      break;
    case 63:
      weatherDescriptionContent = "is raining with moderate intesity";
      break;
    case 65:
      weatherDescriptionContent = "is raining with heavy intesity";
      break;
    case 66:
      weatherDescriptionContent = "is freezing rain with light intensity";
      break;
    case 67:
      weatherDescriptionContent = "is freezing rain with heavy intensity";
      break;
    case 71:
      weatherDescriptionContent = "is snow fall with light intensity";
      break;
    case 73:
      weatherDescriptionContent = "is experiencing snowfall with moderate intensity";
      break;
    case 75:
      weatherDescriptionContent = "is experiencing snowfall with heavy intensity";
      break;
    case 77:
      weatherDescriptionContent = "is snowy with snow grains";
      break;
    case 80:
      weatherDescriptionContent = "is experiencing rain showers with light intensity";
      break;
    case 81:
      weatherDescriptionContent = "is experiencing rain showers with moderate intensity";
      break;
    case 82:
      weatherDescriptionContent = "is experiencing rain showers with violent intensity";
      break;
    case 85:
      weatherDescriptionContent = "is experiencing snow showers with light intensity";
      break;
    case 86:
      weatherDescriptionContent = "is experiencing snow showers with heavy intensity";
      break;
    case 95:
      weatherDescriptionContent = "is thunderstorm";
      break;
    case 96:
      weatherDescriptionContent = "is thunderstorm with light hail";
      break;
    case 99:
      weatherDescriptionContent = "is thunderstorm with heavy hail";
      break;
  }

  element.textContent = weatherDescriptionContent;
}
