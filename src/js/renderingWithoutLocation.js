import { removeSkeleton } from "./index.js";
import { currentWeatherSection, hourlyWeatherSection, dailyWeatherSection } from "./suggestionList.js";

export let alertBar = document.querySelector(".location-permission-info");

export function showAlertBar(alertBar) {
  alertBar.style["opacity"] = "1";
  removeSkeleton();
  currentWeatherSection.style["opacity"] = "0";
  hourlyWeatherSection.style["opacity"] = "0";
  dailyWeatherSection.style["opacity"] = "0";
}

export const hideAlertBar = () => {
  alertBar.style["opacity"] = "0";
};
