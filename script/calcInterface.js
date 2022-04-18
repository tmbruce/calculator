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
    screen.innerHTML = "";
    calculationComplete = !calculationComplete;
  }
  switch (btn) {
    case "clear":
      if (screen.innerHTML == "") {
        topDisplay.innerHTML = "";
      }
      screen.innerHTML = "";
      break;
    case "left-paren":
      screen.innerHTML += "(";
      break;
    case "right-paren":
      screen.innerHTML += ")";
      break;
    case "multiply":
      screen.innerHTML += "×";
      break;
    case "one":
      screen.innerHTML += "1";
      break;
    case "two":
      screen.innerHTML += "2";
      break;
    case "three":
      screen.innerHTML += "3";
      break;
    case "four":
      screen.innerHTML += "4";
      break;
    case "five":
      screen.innerHTML += "5";
      break;
    case "six":
      screen.innerHTML += "6";
      break;
    case "seven":
      screen.innerHTML += "7";
      break;
    case "eight":
      screen.innerHTML += "8";
      break;
    case "nine":
      screen.innerHTML += "9";
      break;
    case "zero":
      screen.innerHTML += "0";
      break;
    case "plus":
      screen.innerHTML += "+";
      break;
    case "divide":
      screen.innerHTML += "÷";
      break;
    case "minus":
      screen.innerHTML += "-";
      break;
    case "decimal":
      if (
        isNaN(screen.innerHTML.toString()) ||
        screen.innerHTML.toString() == ""
      ) {
        screen.innerHTML += "0.";
      } else {
        screen.innerHTML += ".";
      }
      break;
    case "delete":
      let displayTxt = screen.textContent;
      screen.textContent = displayTxt.slice(0, -1);
      break;
    case "exponent":
      let exp = `<sup>2</sup>`;
      screen.innerHTML += exp;
      break;
  }
};

let equalButton = document.querySelector("#equal");

equalButton.addEventListener("click", () => {
  if (!calculationComplete) {
    calculationComplete = !calculationComplete;
    let inputParsed = stringParse(
      screen.innerHTML
        .toString()
        .replaceAll("×", "*")
        .replaceAll("÷", "/")
        .replaceAll("<sup>", "^")
        .replaceAll("</sup>", "")
    );
    let newEq = document.createElement("div");
    newEq.innerHTML = screen.innerHTML + `<br/>`;
    topDisplay.prepend(newEq);
    //topDisplay.innerHTML += screen.innerHTML += `<br>`;
    let pf = postfix(inputParsed);
    let tree = new AbstracTree();
    let nodes = tree.insert(pf);
    let solveReturn = tree.solve(nodes);
    screen.textContent = `= ${solveReturn.data}`;
  }
});
