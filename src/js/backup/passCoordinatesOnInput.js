const input = document.getElementById("h1__input");

export async function passCoordinatesOnInput(val) {
  let userInput = input.value;
  let encodedInput = encodeURIComponent(userInput);
  const data = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodedInput}&count=3&language=en&format=json`
  );
  const dataJson = await data.json();
  const coordinatesToPass = dataJson.results;
  if (coordinatesToPass) {
    const suggestions = coordinatesToPass.map((element) => {
      return {
        name: element.name,
        latitude: element.latitude,
        longitude: element.longitude,
        timezone: element.timezone,
        country: element.country,
        region: element.admin1,
      };
    });
    console.log(suggestions);
    return suggestions;
  }
}

input.addEventListener("click", passCoordinatesOnInput);

// export async function getSearchData(val) {
//   let userInput = input.value;
//   let encodedInput = encodeURIComponent(userInput);
//   const data = await fetch(
//     `https://geocoding-api.open-meteo.com/v1/search?name=${encodedInput}&count=3&language=en&format=json`
//   );
//   const dataJson = await data.json();

//   const suggestionArray = dataJson.results;
//   if (suggestionArray) {
//     const suggestions = suggestionArray.map((element) => {
//       return {
//         name: element.name,
//         latitude: element.latitude,
//         longitude: element.longitude,
//         timezone: element.timezone,
//         country: element.country,
//         region: element.admin1,
//       };
//     });
//     return suggestions;
//   }
// }
