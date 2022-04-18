import stringParse from "./stringParse.js";
import postfix from "./postfix.js";
import AbstracTree from "./ast.js";

let exponentMode = false;
let calculationComplete = false;
let topDisplay = document.querySelector(".top-display");
let screen = document.querySelector(".display");
let expButton = document.getElementById("exponent");

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
const toggleExponentMode = () => {
  exponentMode = !exponentMode;
  expButton.classList.toggle("yellow");
  expButton.classList.toggle("exponent-down");
};

const btnPress = (btn) => {
  let buttonVal = "";
  if (calculationComplete && btn != "clear") {
    screen.innerHTML = "";
    calculationComplete = !calculationComplete;
  }
  switch (btn) {
    case "clear":
      if (screen.innerHTML == "") {
        topDisplay.innerHTML = "";
      }
      screen.innerHTML = "";
      if (exponentMode) {
        toggleExponentMode();
      }
      break;
    case "left-paren":
      buttonVal += "(";
      break;
    case "right-paren":
      buttonVal += ")";
      break;
    case "multiply":
      buttonVal += "×";
      break;
    case "one":
      buttonVal += "1";
      break;
    case "two":
      buttonVal += "2";
      break;
    case "three":
      buttonVal += "3";
      break;
    case "four":
      buttonVal += "4";
      break;
    case "five":
      buttonVal += "5";
      break;
    case "six":
      buttonVal += "6";
      break;
    case "seven":
      buttonVal += "7";
      break;
    case "eight":
      buttonVal += "8";
      break;
    case "nine":
      buttonVal += "9";
      break;
    case "zero":
      buttonVal += "0";
      break;
    case "plus":
      buttonVal += "+";
      break;
    case "divide":
      buttonVal += "÷";
      break;
    case "minus":
      buttonVal += "-";
      break;
    case "decimal":
      if (
        isNaN(screen.innerHTML.toString()) ||
        screen.innerHTML.toString() == ""
      ) {
        buttonVal += "0.";
      } else {
        buttonVal += ".";
      }
      break;
    case "delete":
      if (screen.lastChild.innerHTML != "") {
        screen.lastChild.innerHTML = screen.lastChild.innerHTML.slice(0, -1);
      } else {
        screen.innerHTML = screen.innerHTML.toString().slice(0, -1);
      }
      break;
    case "exponent":
      if (exponentMode) {
        if (screen.lastChild.innerHTML == "") {
          screen.removeChild(screen.lastChild);
        }
        toggleExponentMode();
      } else {
        toggleExponentMode();
        let exp = `<sup></sup>`;
        screen.innerHTML += exp;
      }
      break;
  }
  exponentMode
    ? (screen.lastChild.innerHTML += buttonVal)
    : (screen.innerHTML += buttonVal);
};

let equalButton = document.querySelector("#equal");

equalButton.addEventListener("click", () => {
  if (exponentMode) {
    expButton.classList.toggle("yellow");
    expButton.classList.toggle("exponent-down");
    exponentMode = !exponentMode;
  }
  if (!calculationComplete) {
    calculationComplete = !calculationComplete;
    let inputParsed = stringParse(
      screen.innerHTML
        .toString()
        .replaceAll("<sup></sup>", "")
        .replaceAll("×", "*")
        .replaceAll("÷", "/")
        .replaceAll("<sup>", "^")
        .replaceAll("</sup>", "")
    );
    let newEq = document.createElement("div");
    newEq.innerHTML = screen.innerHTML + `<br/>`;
    topDisplay.prepend(newEq);
    let pf = postfix(inputParsed);
    let tree = new AbstracTree();
    let nodes = tree.insert(pf);
    let solveReturn = tree.solve(nodes);
    screen.textContent = `= ${solveReturn.data}`;
  }
});
