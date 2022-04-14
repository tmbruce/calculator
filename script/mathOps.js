const mathOps = (sym, a, b) => {
  a = Number(a);
  b = Number(b);
  switch (sym) {
    case "+":
      return a + b;
      break;
    case "-":
      return a - b;
      break;
    case "/":
      return a / b;
      break;
    case "*":
      return a * b;
      break;
    case "^":
      return Math.pow(a, b);
  }
};

export default mathOps;
