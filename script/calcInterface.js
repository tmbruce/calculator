import stringParse from "./stringParse.js";
import postfix from "./postfix.js";
import AbstracTree from "./ast.js";

let calculationComplete = false;
let topDisplay = document.querySelector(".top-display");
let screen = document.querySelector(".display");

//Adjust screen size
let screenLarge = true;
let screenSizeButton = document.querySelector("#screen-size");
screenSizeButton.addEventListener("click", () => {
  screenLarge = !screenLarge;
  let topScreen = document.querySelector(".top-display");
  screenLarge
    ? (topScreen.style.height = "7rem")
    : (topScreen.style.height = "0rem");
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
  if (calculationComplete && btn != "clear") {
    screen.textContent = "";
    calculationComplete = !calculationComplete;
  }
  switch (btn) {
    case "clear":
      if (screen.textContent == "") {
        topDisplay.textContent = "";
      }
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
    case "decimal":
      if (isNaN(screen.textContent) || screen.textContent == "") {
        screen.textContent += "0.";
      } else {
        screen.textContent += ".";
      }
      break;
    case "delete":
      let displayTxt = screen.textContent;
      screen.textContent = displayTxt.slice(0, -1);
      break;
    case "exponent":
      screen.textContent += "";
      break;
  }
};

let equalButton = document.querySelector("#equal");

equalButton.addEventListener("click", () => {
  console.log(screen.textContent);
  if (!calculationComplete) {
    calculationComplete = !calculationComplete;
    let inputParsed = stringParse(
      screen.textContent.replaceAll("×", "*").replaceAll("÷", "/")
    );
    topDisplay.textContent = screen.textContent;
    let pf = postfix(inputParsed);
    let tree = new AbstracTree();
    let nodes = tree.insert(pf);
    let solveReturn = tree.solve(nodes);
    screen.textContent = `= ${solveReturn.data}`;
  }
});
