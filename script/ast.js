import mathOps from "./mathOps.js";

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class AbstractTree {
  constructor() {
    //this.root = null;
  }

  isOperator(val) {
    return isNaN(val);
  }

  insert(data) {
    let stack = [];
    data.forEach((value) => {
      if (this.isOperator(value)) {
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

  solve(node) {
    if (this.isOperator(node.data)) {
      if (
        !this.isOperator(node.left.data) &&
        !this.isOperator(node.right.data)
      ) {
        node.data = mathOps(node.data, node.left.data, node.right.data);
        node.left = null;
        node.right = null;
      } else {
        this.solve(node.left);
        this.solve(node.right);
      }
      this.solve(node);
      return node;
    }
  }
}

export default AbstractTree;
