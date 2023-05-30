const h1Input = document.getElementById("h1__input");

export function adjusth1InputHeight() {
  h1Input.style.height = "auto";
  h1Input.style.height = h1Input.scrollHeight + "px";
}

// export function setInitialh1InputHeight() {
//   h1Input.style.height = "auto";
//   h1Input.style.height = h1Input.scrollHeight + "px";
// }

h1Input.addEventListener("input", adjusth1InputHeight);
