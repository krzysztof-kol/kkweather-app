const h1Input = document.querySelector("#h1_input");

function adjustWidth(input) {
  let numberOfCharacters = input.value.length;

  if (numberOfCharacters >= 7) {
    let length = numberOfCharacters + "ch";
    input.style.width = length;
  }

  if (numberOfCharacters <= 7) {
    let length = numberOfCharacters + "ch";
    input.style.width = length;
  }
}
