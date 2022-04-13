class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class AbstractTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const operators = ["+", "-", "*", "/", "^"];
    let stack = [];
    data.forEach((value) => {
      if (operators.indexOf(value) !== -1) {
        let newNode = new Node(value);
        newNode.right = stack.pop();
        newNode.left = stack.pop();
        stack.push(newNode);
      } else {
        let newNode = new Node(value);
        stack.push(newNode);
      }
    });
    return stack.pop();
  }
}
