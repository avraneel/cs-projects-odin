import { TreeNode } from "./TreeNode.js";

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(arr) {
    this.tree = this.buildTree(arr);
  }

  buildTree(arr) {
    const root = new Node(arr[Math.floor(n / 2)]);
    const q = Array(arr.length);
  }
}
