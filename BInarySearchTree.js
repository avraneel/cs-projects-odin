class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = this.buildTreeRecursive(0, arr.length - 1);
  }

  buildTreeRecursive(left, right) {
    if (left > right) return null;

    const mid = Math.floor((left + right) / 2);
    const root = new Node(this.arr[mid]);

    root.left = this.buildTreeRecursive(left, mid - 1);
    root.right = this.buildTreeRecursive(mid + 1, right);

    return root;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const bst = new Tree([23, 43, 55, 56, 73, 91]);
prettyPrint(bst.root);
