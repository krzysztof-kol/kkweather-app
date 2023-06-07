var paragraph = document.getElementById("h1__input");
var placeholderText = "Your location";

export function handleInput() {
  if (paragraph.textContent === "") {
    paragraph.textContent = placeholderText;
  } else if (paragraph.textContent === placeholderText) {
    paragraph.textContent = "";
  }
}

export function handleFocus() {
  if (paragraph.textContent === placeholderText) {
    paragraph.textContent = "";
  }
}
