import { getCoordinates } from "./getCoords.js";
import { getTimeData } from "./getTimeData.js";
import { setWeatherIcon } from "./getWeatherIconAndDescription.js";
import { setWeatherDescription } from "./getWeatherIconAndDescription.js";
import { getCityData } from "./getCity.js";
import "./toggles.js";

// łączenie się z API

export const weatherData = async (coordinates) => {
  let latitude = coordinates.latitude;
  let longitude = coordinates.longitude;
  let timezone = coordinates.timezone;

  const weatherDataRaw = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,surface_pressure,windspeed_10m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_probability_max&current_weather=true&timezone=${timezone}`
  );
  const weatherData = await weatherDataRaw.json();

  //destrukturyzacja
  const { current_weather: currentWeatherData, hourly: hourlyWeatherData, daily: dailyWeatherData } = weatherData;

  return { currentWeatherData, hourlyWeatherData, dailyWeatherData };
};

//CURRENT SECTION---------------------------------------------------------------------------------------------------
//stworzenie obiektu, zawierającego wszystkie dane currentWeather

export const currentWeatherParameters = (weatherData, timeData) => {
  const currentWeatherData = weatherData.currentWeatherData;
  const dailyWeatherData = weatherData.dailyWeatherData;
  const hourlyWeatherData = weatherData.hourlyWeatherData;

  //dane z current_weather

  const {
    temperature: currentTemperature,
    windspeed: currentWindSpeed,
    weathercode: currentWeatherCode,
    is_day: currentIsDay,
  } = currentWeatherData;

  //dane z dailyWeather

  const {
    temperature_2m_max: currentHighTempArray,
    temperature_2m_min: currentLowTempArray,
    apparent_temperature_max: currentFLHighTempArray,
    apparent_temperature_min: currentFLLowTempArray,
  } = dailyWeatherData;

  const currentHighTemp = currentHighTempArray[0];
  const currentLowTemp = currentLowTempArray[0];
  const currentFLHighTemp = currentFLHighTempArray[0];
  const currentFLLowTemp = currentFLLowTempArray[0];

  //dane z hourlyWeather

  const { precipitation: currentPrecipArray } = hourlyWeatherData;
  const currentPrecip = currentPrecipArray[timeData.hour];

  //aktualna pogoda

  const parameters = {
    currentTemperature,
    currentWindSpeed,
    currentWeatherCode,
    currentIsDay,
    currentHighTemp,
    currentLowTemp,
    currentFLHighTemp,
    currentFLLowTemp,
    currentPrecip,
  };
  return parameters;
};

//wyświetlenie danych dotyczących current weather

export function renderCurrentWeatherData(weatherData) {
  const currentTempOnPage = document.getElementById("current-temp");
  const currentTempHighOnPage = document.getElementById("current-high-temp");
  const currentTempLowOnPage = document.getElementById("current-low-temp");
  const currentTempFLHighOnPage = document.getElementById("current-fl-high-temp");
  const currentTempFLLowOnPage = document.getElementById("current-fl-low-temp");
  const currentWindSpeedOnPage = document.getElementById("current-windspeed");
  const currentPrecipOnPage = document.getElementById("current-precip");

  const currentWeatherIcon = document.querySelector(".current-weather-icon");
  currentWeatherIcon.classList = "wi icon-big current-weather-icon";

  const currentWeatherDescription = document.querySelector("#current-weather__description");

  currentTempOnPage.textContent = weatherData.currentTemperature;
  currentWindSpeedOnPage.textContent = weatherData.currentWindSpeed;
  currentTempHighOnPage.textContent = weatherData.currentHighTemp;
  currentTempLowOnPage.textContent = weatherData.currentLowTemp;
  currentTempFLHighOnPage.textContent = weatherData.currentFLHighTemp;
  currentTempFLLowOnPage.textContent = weatherData.currentFLLowTemp;
  currentPrecipOnPage.textContent = weatherData.currentPrecip;

  setWeatherIcon(currentWeatherIcon, weatherData.currentWeatherCode, weatherData.currentIsDay);

  setWeatherDescription(currentWeatherDescription, weatherData.currentWeatherCode, weatherData.currentIsDay);
}

//HOURLY SECTION---------------------------------------------------------------------------------------------------

//stworzenie obiektu, który będzie zawierał wszystkie dane z hourly weather

export const hourlyWeatherParameters = (weatherData) => {
  const hourlyWeatherData = weatherData.hourlyWeatherData;

  const {
    time: hourlyTimeArray,
    temperature_2m: hourlyTemperatureArray,
    precipitation_probability: hourlyPrecipitationProbabilityArray,
    precipitation: hourlyPrecipitationSumArray,
    weathercode: weatherCodeArray,
    is_day: isDayArray,
  } = hourlyWeatherData;

  return {
    hourlyTimeArray,
    hourlyTemperatureArray,
    hourlyPrecipitationProbabilityArray,
    hourlyPrecipitationSumArray,
    weatherCodeArray,
    isDayArray,
  };
};

// stworzenie tablic z parametrami czasowymi dla sekcji hourly

export const hourlyTimeParametersArrays = (hourlyWeatherParameters) => {
  const hourlyTime = hourlyWeatherParameters.hourlyTimeArray;
  let hourlyYearArray = [],
    hourlyMonthArray = [],
    hourlyDayArray = [],
    hourlyHourArray = [],
    hourlyMinuteArray = [];

  //pętla dla każdego z elementów tablicy time
  //2023-06-05T01:00

  hourlyTime.forEach((element) => {
    hourlyYearArray.push(Number(element.slice(0, 4)));
    hourlyMonthArray.push(Number(element.slice(5, 7)));
    hourlyDayArray.push(Number(element.slice(8, 10)));
    hourlyHourArray.push(Number(element.slice(11, 13)));
    hourlyMinuteArray.push(Number(element.slice(14, 16)));
  });

  return {
    hourlyYearArray,
    hourlyMonthArray,
    hourlyDayArray,
    hourlyHourArray,
    hourlyMinuteArray,
  };
};

//przetworzenie danych czasowych z tablicy na odpowiednie dane (nazwa dnia itp)

export const hourlyTimeParametersDisplay = (hourlyTimeParametersArrays, timeData) => {
  let {
    hourlyYearArray: hourlyYearDisplay,
    hourlyMonthArray: hourlyMonthDisplay,
    hourlyDayArray: hourlyDayDisplay,
    hourlyHourArray: hourlyHourDisplay,
    hourlyMinuteArray: hourlyMinuteDisplay,
  } = hourlyTimeParametersArrays;

  for (let i = timeData.hour; i < hourlyYearDisplay.length; i++) {
    if (hourlyMonthDisplay[i] < 10) hourlyMonthDisplay[i] = "0" + hourlyMonthDisplay[i];
    if (hourlyHourDisplay[i] < 10) hourlyHourDisplay[i] = "0" + hourlyHourDisplay[i];
    if (hourlyMinuteDisplay[i] < 10) hourlyMinuteDisplay[i] = "0" + hourlyMinuteDisplay[i];

    let actualDay = (timeData.dayWeek + Math.floor(i / 24)) % 7;
    hourlyDayDisplay[i] = timeData.weekNames[actualDay];
  }

  return {
    hourlyYearDisplay,
    hourlyMonthDisplay,
    hourlyDayDisplay,
    hourlyHourDisplay,
    hourlyMinuteDisplay,
  };
};

//tworze obiekty, zawierające wszystkie dane pogodowe dla hourlySection

export const createHourlyObject = (hourlyWeatherParameters, hourlyTimeParametersDisplay, timeData) => {
  const {
    hourlyTimeArray,
    hourlyTemperatureArray,
    hourlyPrecipitationProbabilityArray,
    hourlyPrecipitationSumArray,
    weatherCodeArray,
    isDayArray,
  } = hourlyWeatherParameters;

  const { hourlyYearDisplay, hourlyMonthDisplay, hourlyDayDisplay, hourlyHourDisplay, hourlyMinuteDisplay } = hourlyTimeParametersDisplay;

  let hourlyWeatherData = [];

  for (let i = timeData.hour; i < hourlyTimeArray.length; i++) {
    let data = {
      day: hourlyDayDisplay[i],
      hour: `${hourlyHourDisplay[i]}:${hourlyMinuteDisplay[i]}`,
      temperature: hourlyTemperatureArray[i] + "°C",
      precipProb: hourlyPrecipitationProbabilityArray[i] + "%",
      precip: hourlyPrecipitationSumArray[i] + "mm",
      weathercode: weatherCodeArray[i],
      isDay: isDayArray[i],
    };

    hourlyWeatherData.push(data);
  }
  return hourlyWeatherData;
};

//stworzenie obiektów zawierających dane o klasie elementów itp

export const createElementParameters = () => {
  const elementParameters = [
    {
      class: "hourly-detail hourly-detail-day",
      elements: [{ class: "hourly-day text-normal text-bold", property: "day" }],
    },
    {
      class: "hourly-detail hourly-detail-time",
      elements: [
        { class: "wi hourly-icon icon-small", property: "weatherCode" },
        { class: "hourly-time text-normal", property: "time" },
      ],
    },
    {
      class: "hourly-detail hourly-detail-temp",
      elements: [
        { class: "wi hourly-icon icon-small wi-thermometer" },
        {
          class: "hourly-temp text-normal temperature__small",
          property: "temperature",
        },
      ],
    },
    {
      class: "hourly-detail hourly-detail-prob",
      elements: [
        { class: "wi hourly-icon icon-small wi-humidity" },
        {
          class: "hourly-precip-probability text-normal temperature__small",
          property: "precipProb",
        },
      ],
    },
    {
      class: "hourly-detail hourly-detail-sum",
      elements: [
        { class: "wi hourly-icon icon-small wi-rain" },
        {
          class: "hourly-precip-sum text-normal temperature__small",
          property: "precipSum",
        },
      ],
    },
  ];

  return elementParameters;
};

//appendowanie elementów do sekcji hourly

export const createHourlySection = (createHourlyObject, createElementParameters) => {
  const hourlyWeatherData = createHourlyObject;
  const elementParameters = createElementParameters;
  const hourlySection = document.querySelector(".hourly-forecast__section");
  hourlySection.innerHTML = "";

  hourlyWeatherData.forEach((data) => {
    const hourlyForecastElement = document.createElement("div");
    hourlyForecastElement.classList = "hourly-forecast__element";

    elementParameters.forEach((param) => {
      const detailElement = document.createElement("div");
      detailElement.classList = param.class;

      param.elements.forEach((element) => {
        const par = document.createElement("div");
        par.className = element.class;

        if (element.property === "day") par.textContent = data.day.slice(0, 3);
        else if (element.property === "time") par.textContent = data.hour;
        else if (element.property === "weatherCode") setWeatherIcon(par, data.weathercode, data.isDay);
        else if (element.property === "temperature") par.textContent = data.temperature;
        else if (element.property === "precipProb") par.textContent = data.precipProb;
        else if (element.property === "precipSum") par.textContent = data.precip;

        detailElement.appendChild(par);
      });
      hourlyForecastElement.appendChild(detailElement);
    });
    hourlySection.appendChild(hourlyForecastElement);
  });
};

//DAILY SECTION---------------------------------------------------------------------------------------------------

//stworzenie obiektu zawierającego wszystkie dane daily

export const dailyWeatherData = (weatherData) => {
  const dailyWeatherData = weatherData.dailyWeatherData;

  const {
    time: dailyTimeArray,
    weathercode: dailyWeathercodeArray,
    temperature_2m_max: dailyTemperatureMaxArray,
    temperature_2m_min: dailyTemperatureMinArray,
    apparent_temperature_max: dailyTemperatureFLMaxArray,
    apparent_temperature_min: dailyTemperatureFLMinArray,
    sunrise: dailySunriseArray,
    sunset: dailySunsetArray,
    precipitation_sum: dailyPrecipSumArray,
    precipitation_probability_max: dailyPrecipProb,
  } = dailyWeatherData;

  const dailyWeatherDataArrays = {
    dailyTimeArray,
    dailyWeathercodeArray,
    dailyTemperatureMaxArray,
    dailyTemperatureMinArray,
    dailyTemperatureFLMaxArray,
    dailyTemperatureFLMinArray,
    dailySunriseArray,
    dailySunsetArray,
    dailyPrecipSumArray,
    dailyPrecipProb,
  };

  return dailyWeatherDataArrays;
};

//przerobienie danych do wyświetlania na stronie

export const dailyWeatherDisplay = (dailyWeatherData, timeData) => {
  const {
    dailyTimeArray: dailyTimeArray,
    dailyWeathercodeArray: dailyWeathercodeArray,
    dailyTemperatureMaxArray: dailyTemperatureMaxArray,
    dailyTemperatureMinArray: dailyTemperatureMinArray,
    dailyTemperatureFLMaxArray: dailyTemperatureFLMaxArray,
    dailyTemperatureFLMinArray: dailyTemperatureFLMinArray,
    dailySunriseArray: dailySunriseArray,
    dailySunsetArray: dailySunsetArray,
    dailyPrecipSumArray: dailyPrecipSumArray,
    dailyPrecipProb: dailyPrecipProb,
  } = dailyWeatherData;

  //stworzenie tablicy nazw dni

  const dailyNamesArray = [];
  const dailyDatesArray = [];
  const dailySunriseHourArray = [];
  const dailySunsetHourArray = [];

  dailyTimeArray.forEach((element, index) => {
    element = timeData.weekNames[(timeData.dayWeek + index) % 7].slice(0, 3);
    dailyNamesArray.push(element);
  });

  //przerobienie daty

  dailyTimeArray.forEach((element) => {
    element = `${element.slice(8, 10)}.${element.slice(5, 7)}.${element.slice(0, 4)}`;
    dailyDatesArray.push(element);
  });

  //przerobienie wschodu i zachodu słońca

  dailySunriseArray.forEach((element) => {
    element = `${element.slice(11, element.length)}`;
    dailySunriseHourArray.push(element);
  });

  dailySunsetArray.forEach((element) => {
    element = element.slice(11, element.length);
    dailySunsetHourArray.push(element);
  });

  const dailyDataDisplay = {
    dailyWeathercodeArray,
    dailyTemperatureMaxArray,
    dailyTemperatureMinArray,
    dailyTemperatureFLMaxArray,
    dailyTemperatureFLMinArray,
    dailyPrecipSumArray,
    dailyPrecipProb,
    dailyNamesArray,
    dailyDatesArray,
    dailySunriseHourArray,
    dailySunsetHourArray,
  };

  return dailyDataDisplay;
};

//stworzenie obiektu, zawierającego całe info dailyData

export const createDailyObject = (dailyDataDisplay) => {
  const {
    dailyWeathercodeArray,
    dailyTemperatureMaxArray,
    dailyTemperatureMinArray,
    dailyTemperatureFLMaxArray,
    dailyTemperatureFLMinArray,
    dailyPrecipSumArray,
    dailyPrecipProb,
    dailyNamesArray,
    dailyDatesArray,
    dailySunriseHourArray,
    dailySunsetHourArray,
  } = dailyDataDisplay;

  let dailyWeatherData = [];

  for (let i = 0; i < dailyWeathercodeArray.length; i++) {
    let data = {
      day: dailyNamesArray[i],
      date: dailyDatesArray[i],
      tempMax: dailyTemperatureMaxArray[i],
      tempMin: dailyTemperatureMinArray[i],
      tempFLMax: dailyTemperatureFLMaxArray[i],
      tempFLMin: dailyTemperatureFLMinArray[i],
      precipProb: dailyPrecipProb[i],
      precipSum: dailyPrecipSumArray[i],
      sunrise: dailySunriseHourArray[i],
      sunset: dailySunsetHourArray[i],
      weathercode: dailyWeathercodeArray[i],
    };

    dailyWeatherData.push(data);
  }

  return dailyWeatherData;
};

//stworzenie obiektu z z klasami i właściwościami, należącymi do jednego elementu DF Element

export const createDailyWeatherParams = () => {
  const dailyWeatherElementParams = [
    {
      class: "df__data-container df__data-container-main",
      elements: [
        {
          class: "df__data",
          elements: [
            {
              class: "icon-medium wi df__icon-main",
              property: "weathercode",
            },
          ],
        },
        {
          class: "df__data df__data-main",
          elements: [
            { class: "text-bold df__text df__day", property: "day" },
            { class: "df__text df__date", property: "date" },
          ],
        },
      ],
    },
    {
      class: "df__data-container df__data-container-data",
      elements: [
        {
          class: "df__data",
          elements: [{ class: "df__icon icon-small wi wi-thermometer" }, { class: "df__text daily-temp", property: "tempMax" }],
        },
        {
          class: "df__data",
          elements: [{ class: "df__icon icon-small wi wi-thermometer-exterior" }, { class: "df__text daily-temp", property: "tempMin" }],
        },
        {
          class: "df__data",
          elements: [{ class: "df__icon icon-small wi wi-rain" }, { class: "df__text daily-precip", property: "precipSum" }],
        },
        {
          class: "df__data",
          elements: [
            { class: "df__icon icon-small wi wi-raindrop" },
            { class: "df__text df__precip daily-precip-prob", property: "precipProb" },
          ],
        },
        {
          class: "df__data",
          elements: [{ class: "df__icon icon-small wi wi-sunrise" }, { class: "df__text", property: "sunrise" }],
        },
        {
          class: "df__data",
          elements: [{ class: "df__icon icon-small wi wi-sunset" }, { class: "df__text", property: "sunset" }],
        },
      ],
    },
  ];

  return dailyWeatherElementParams;
};

//stworzenie elementów daily weather section

export const createDailyWeatherSection = (createDailyObject, createDailyWeatherParams) => {
  const dailyWeatherData = createDailyObject;
  const elementParameters = createDailyWeatherParams;

  const DFContainer = document.querySelector("#DF__container");
  DFContainer.innerHTML = "";

  dailyWeatherData.forEach((data) => {
    const DFElement = document.createElement("div");
    DFElement.classList = "df__element";

    elementParameters.forEach((container) => {
      const DFDataContainer = document.createElement("div");
      DFDataContainer.classList = container.class;

      container.elements.forEach((paramElement) => {
        const DFData = document.createElement("div");
        DFData.classList = paramElement.class;

        paramElement.elements.forEach((element) => {
          const DFDataElement = document.createElement("div");
          DFDataElement.classList = element.class;

          if (element.property === "day") DFDataElement.textContent = data.day;
          else if (element.property === "weathercode") setWeatherIcon(DFDataElement, data.weathercode, 1);
          else if (element.property === "date") DFDataElement.textContent = data.date;
          else if (element.property === "tempMax") DFDataElement.textContent = data.tempMax;
          else if (element.property === "tempMin") DFDataElement.textContent = data.tempMin;
          else if (element.property === "precipProb") DFDataElement.textContent = data.precipProb;
          else if (element.property === "precipSum") DFDataElement.textContent = data.precipSum;
          else if (element.property === "sunrise") DFDataElement.textContent = data.sunrise;
          else if (element.property === "sunset") DFDataElement.textContent = data.sunset;

          DFData.appendChild(DFDataElement);
        });
        DFDataContainer.appendChild(DFData);
      });
      DFElement.appendChild(DFDataContainer);
    });
    DFContainer.appendChild(DFElement);
  });
};
