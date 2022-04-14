//Converts infix array to reverse polish notation using Shunting-Yard algorithm
//Expects parsed expression string, returns postfix array
import operatorPrecedence from "../script/operatorPrecedence.js";
const operators = ["+", "-", "*", "/", "^"];

const postfix = (parsed) => {
  let rpn = [];
  let stack = [];
  for (let i = 0; i < parsed.length; i++) {
    if (operators.indexOf(parsed[i]) !== -1) {
      if (
        operatorPrecedence[stack[stack.length - 1]] >=
        operatorPrecedence[parsed[i]]
      ) {
        rpn.push(stack.pop());
        stack.push(parsed[i]);
      } else {
        stack.push(parsed[i]);
      }
    } else {
      if (parsed[i] == "(") {
        stack.push(parsed[i]);
      } else if (parsed[i] == ")") {
        for (let i = stack.length - 1; i > 0; i--) {
          if (stack[i] == "(") {
            stack.pop();
            break;
          } else {
            rpn.push(stack.pop());
          }
        }
      } else {
        rpn.push(Number(parsed[i]));
      }
    }
  }
  while (stack.length != 0) {
    let leftover = stack.pop();
    if (leftover == ")" || leftover == "(") {
      stack.pop();
    } else {
      rpn.push(leftover);
    }
  }

  return rpn;
};

export default postfix;
