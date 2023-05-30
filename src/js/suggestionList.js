const input = document.getElementById("h1__input");

let latitude, longitude, timezone;

async function getSearchData(val) {
  let searchSuggestionList = [];
  let userInput = input.value;
  let encodedInput = encodeURIComponent(userInput);
  const data = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodedInput}&count=3&language=en&format=json`
  );
  const dataJson = await data.json();

  const suggestionArray = dataJson.results;
  if (dataJson.results) {
    suggestionArray.forEach((element) => {
      const suggestion = {
        name: element.name,
        latitude: element.latitude,
        longitude: element.longitude,
        timezone: element.timezone,
        country: element.country,
        region: element.admin1,
      };
      searchSuggestionList.push(suggestion);
    });
  }

  console.log(searchSuggestionList);
  suggestionListOnPage.innerHTML = "";
  addElementsToSuggestionList(searchSuggestionList);
}

function addElementsToSuggestionList(elements) {
  const suggestionList = document.createElement("ul");
  suggestionList.className = "suggestion-list";
  suggestionListOnPage.appendChild(suggestionList);

  elements.forEach((element) => {
    const suggestionElement = document.createElement("li");
    suggestionElement.className = "suggestion-element";
    suggestionList.appendChild(suggestionElement);

    suggestionElement.addEventListener("click", () => {
      input.value = element.name;
      suggestionListOnPage.innerHTML = "";
    });

    if (element.region) {
      suggestionElement.textContent = `${element.name}, ${element.region}, ${element.country}`;
    } else {
      suggestionElement.textContent = `${element.name}, ${element.country}`;
    }
  });
}

const suggestionListOnPage = document.getElementById("result");
