let outputString = "";

let screen = document.querySelector(".display");
screen.textContent = outputString;

//Adjust screen size
let screenLarge = true;
let screenSizeButton = document.querySelector("#screen-size");
screenSizeButton.addEventListener("click", () => {
  screenLarge = !screenLarge;
  let screen = document.querySelector(".display");
  screenLarge
    ? (screen.style.height = "200px")
    : (screen.style.height = "60px");
});

let calcButtons = [
  "clear",
  "left-paren",
  "right-paren",
  "multiply",
  "exponent",
  "percent",
  "plus-minus",
  "divide",
  "seven",
  "eight",
  "nine",
  "minus",
  "four",
  "five",
  "six",
  "plus",
  "one",
  "two",
  "three",
  "equal",
  "decimal",
  "zero",
  "delete",
];

calcButtons.forEach((btn) => {
  document.querySelector(`#${btn}`).addEventListener("click", (e) => {
    btnPress(e.target.id);
  });
});

const btnPress = (btn) => {
  switch (btn) {
    case "clear":
      screen.textContent = "";
      break;
    case "left-paren":
      screen.textContent += "(";
      break;
    case "right-paren":
      screen.textContent += ")";
      break;
    case "multiply":
      screen.textContent += "×";
      break;
    case "one":
      screen.textContent += "1";
      break;
    case "two":
      screen.textContent += "2";
      break;
    case "three":
      screen.textContent += "3";
      break;
    case "four":
      screen.textContent += "4";
      break;
    case "five":
      screen.textContent += "5";
      break;
    case "six":
      screen.textContent += "6";
      break;
    case "seven":
      screen.textContent += "7";
      break;
    case "eight":
      screen.textContent += "8";
      break;
    case "nine":
      screen.textContent += "9";
      break;
    case "zero":
      screen.textContent += "0";
      break;
    case "plus":
      screen.textContent += "+";
      break;
    case "divide":
      screen.textContent += "÷";
      break;
    case "minus":
      screen.textContent += "-";
      break;
    case "delete":
      let displayTxt = screen.textContent;
      screen.textContent = displayTxt.slice(0, -1);
      break;
  }
};
