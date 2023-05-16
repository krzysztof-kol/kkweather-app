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

adjusth1InputHeight();
setInitialh1InputHeight();
