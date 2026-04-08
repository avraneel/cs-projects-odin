class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

/**
 * Helper class to store the node and the start and end index of the subarray/subtree
 * where the node is the middle.
 */
class Subtree {
  constructor(node, start, end) {
    this.node = node;
    this.start = start;
    this.end = end;
  }
}

export class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = this.buildTreeQueue(0, arr.length - 1);
  }

  buildTreeRecursive(left, right) {
    if (left > right) return null;

    const mid = Math.floor((left + right) / 2);
    const root = new Node(this.arr[mid]);

    root.left = this.buildTreeRecursive(left, mid - 1);
    root.right = this.buildTreeRecursive(mid + 1, right);

    return root;
  }

  buildTreeQueue() {
    let n = this.arr.length;

    if (n == 0) return null;

    let mid = Math.floor((n - 1) / 2);
    let root = new Node(this.arr[mid]);

    let q = new Array();
    q.push(new Subtree(root, 0, n - 1));

    while (q.length > 0) {
      let d = q.shift();
      let curr = d.node;
      let st = d.start,
        en = d.end;
      mid = Math.floor((st + en) / 2);

      // if left subtree exists
      if (st < mid) {
        let leftVal = Math.floor((st + mid - 1) / 2);
        let left = new Node(this.arr[leftVal]);
        curr.left = left;
        q.push(new Subtree(left, st, mid - 1));
      }

      // if right subtree exists
      if (en > mid) {
        let rightVal = Math.floor((mid + 1 + en) / 2);
        let right = new Node(this.arr[rightVal]);
        curr.right = right;
        q.push(new Subtree(right, mid + 1, en));
      }
    }
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
const bst2 = new Tree([1, 5, 9, 14, 23, 27]);
prettyPrint(bst.root);
prettyPrint(bst2.root);
