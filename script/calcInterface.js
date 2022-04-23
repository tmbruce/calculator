import stringParse from "./stringParse.js";
import postfix from "./postfix.js";
import AbstracTree from "./ast.js";

let exponentMode = false;
let calculationComplete = false;
let currentInput = "";
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

const calcButtons = [
  "multiply",
  "exponent",
  "percent",
  "plus-minus",
  "divide",
  "decimal",
  "plus",
  "minus",
  "clear",
  "left-paren",
  "right-paren",
  "seven",
  "eight",
  "nine",
  "four",
  "five",
  "six",
  "one",
  "two",
  "three",
  "zero",
  "delete",
];

const operators = calcButtons.slice(0, 11);

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
  if (operators.slice(0, 8).indexOf(btn) != -1 && calculationComplete == true) {
    calculationComplete = !calculationComplete;
    let newOperation = screen.innerHTML.toString().replace("= ", "");
    screen.innerHTML = newOperation;
  }
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
    case "plus-minus":
      let currentVal = screen.innerHTML;
      if (currentVal.indexOf("-") == -1) {
        currentVal = "-" + currentVal;
      } else {
        currentVal = currentVal.replace("-", "");
      }
      screen.innerHTML = currentVal;
      break;
    case "decimal":
      if (currentInput.indexOf(".") == -1) {
        if (
          isNaN(screen.innerHTML.toString()) ||
          screen.innerHTML.toString() == ""
        ) {
          buttonVal += "0.";
        } else {
          buttonVal += ".";
        }
      }
      break;
    case "delete":
      if (screen.lastChild.innerHTML) {
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
  if (operators.indexOf(btn) != -1) {
    currentInput = "";
  } else {
    currentInput += buttonVal;
  }
  console.log(screen.innerHTML);
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
    let solveReturn;
    try {
      solveReturn = tree.solve(nodes);
    } catch (e) {
      solveReturn = "Syntax error";
    }
    screen.innerHTML = `= ${solveReturn.data}`;
  }
});
