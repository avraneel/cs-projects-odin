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
    this.root = this.buildTree(arr, 0, arr.length - 1);
  }

  buildTree(arr, left, right) {
    if (left > right) return null;

    const mid = Math.floor((left + right) / 2);
    const root = new Node(arr[mid]);

    root.left = this.buildTree(arr, left, mid - 1);
    root.right = this.buildTree(arr, mid + 1, right);

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

  includes(value) {
    let curr = this.root;

    while (curr !== null) {
      if (curr.data === value) {
        return true;
      } else if (value < curr.data) {
        curr = curr.left;
      } else if (value > curr.data) {
        curr = curr.right;
      }
    }
    return false;
  }

  /**
   * @description Searches the value in the BST and returns the Node object,
   * else returns undefined
   */
  find(value) {
    let curr = this.root;

    while (curr !== null) {
      if (curr.data === value) {
        return curr;
      } else if (value < curr.data) {
        curr = curr.left;
      } else if (value > curr.data) {
        curr = curr.right;
      }
    }
    return undefined;
  }

  insert(value) {
    let curr = this.root;

    while (curr !== null) {
      if (value < curr.data && curr.left !== null) {
        curr = curr.left;
      } else if (value > curr.data && curr.right !== null) {
        curr = curr.right;
      } else break;
    }

    if (value < curr.data) {
      curr.left = new Node(value);
    } else {
      curr.right = new Node(value);
    }
  }

  deleteItem(root, value) {
    if (root === null) return root;

    if (value < root.data) {
      root.left = this.deleteItem(root.left, value);
    } else if (value > root.data) {
      root.right = this.deleteItem(root.right, value);
    } else {
      // Node with 0 or 1 child, as if node == null then node.left/right also = null
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      } else {
        // Node with both child
        const suc = successor(root);
        root.data = suc.data;
        root.right = this.deleteItem(root.right, suc.data);
      }
    }
    return root;
  }

  levelOrderForEach(callback) {
    const result = [];
    const q = [];
    q.push(this.root);

    while (q.length) {
      const curr = q.shift();
      result.push(callback(curr.data));
      if (curr.left) {
        q.push(curr.left);
      }
      if (curr.right) {
        q.push(curr.right);
      }
    }

    return result;
  }

  inOrderForEach(root, callback, result) {
    if (root === null) {
      return;
    }
    this.inOrderForEach(root.left, callback, result);
    result.push(callback(root.data));
    this.inOrderForEach(root.right, callback, result);
  }

  preOrderForEach(root, callback) {
    if (root === null) {
      return;
    }
    console.log(callback(root.data));
    this.preOrderForEach(root.left, callback);
    this.preOrderForEach(root.right, callback);
  }

  postOrderForEach(root, callback) {
    if (root === null) {
      return;
    }
    this.postOrderForEach(root.left, callback);
    this.postOrderForEach(root.right, callback);
    console.log(callback(root.data));
  }

  rebalance() {
    const arr = [];
    this.inOrderForEach(this.root, (x) => x, arr);
    this.root = this.buildTree(arr, 0, arr.length - 1);
  }
}

function height(root, value) {
  const node = root.find(value);

  if (node === undefined) {
    return undefined;
  } else {
    return calcHeight(node);
  }
}

function calcHeight(node) {
  if (node === null) return -1;

  let lheight = calcHeight(node.left);
  let rheight = calcHeight(node.right);

  return Math.max(lheight, rheight) + 1;
}

function isBalanced(root) {
  if (root === null) return true;
  let lh = calcHeight(root.left);
  let rh = calcHeight(root.right);
  if (Math.abs(lh - rh) > 1) {
    return false;
  }
  return isBalanced(root.left) && isBalanced(root.right);
}

function successor(root) {
  let curr = root.right;
  while (curr.left != null) {
    curr = curr.left;
  }

  return curr;
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
//prettyPrint(bst.root);
//console.log(bst.includes(73));
//console.log(bst.includes(54));
console.log(isBalanced(bst.root));
bst.insert(44);
prettyPrint(bst.root);
//console.log(successor(bst.root));
//bst.deleteItem(bst.root, 55);
//prettyPrint(bst.root);
const res = [];
bst.inOrderForEach(bst.root, (x) => x, res);
console.log(res);

// const re2 = bst.inOrderForEach(bst.root, (x) => {
//   return x;
// });
// console.log();
// bst.preOrderForEach(bst.root, (x) => x);
// console.log();
// bst.postOrderForEach(bst.root, (x) => x);
// console.log(re);
// console.log(height(bst, 55));
console.log(isBalanced(bst.root));
bst.rebalance();
prettyPrint(bst.root);
