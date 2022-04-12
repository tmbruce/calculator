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
      let newNode = new Node(data);
      if (this.root === null) {
          this.root == newNode;
      } else {
          this.insertNode(this.root, newNode);
      };
      insertNode (node, newNode) {
          
      }
  }
}
