import { inspect } from "util";

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
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    const sortedArray = mergeSort(arr);
    return this.#buildRecursion(sortedArray, 0, sortedArray.length - 1);
  }

  #buildRecursion(arr, left, right) {
    if (left > right) return null;

    const mid = Math.floor((left + right) / 2);
    const root = new Node(arr[mid]);

    root.left = this.#buildRecursion(arr, left, mid - 1);
    root.right = this.#buildRecursion(arr, mid + 1, right);

    return root;
  }

  #buildTreeQueue() {
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

  inOrderForEach(callback) {
    let result = [];
    this.#inOrder(this.root, callback, result);
    return result;
  }

  #inOrder(root, callback, result) {
    if (root === null) {
      return;
    }
    this.#inOrder(root.left, callback, result);
    result.push(callback(root.data));
    this.#inOrder(root.right, callback, result);
  }

  preOrderForEach(callback) {
    let result = [];
    this.#preOrder(this.root, callback, result);
    return result;
  }

  #preOrder(root, callback, result) {
    if (root === null) {
      return;
    }
    result.push(callback(root.data));
    this.#preOrder(root.left, callback, result);
    this.#preOrder(root.right, callback, result);
  }

  postOrderForEach(callback) {
    let result = [];
    this.#postOrder(this.root, callback, result);
    return result;
  }

  #postOrder(root, callback, result) {
    if (root === null) {
      return;
    }
    this.#postOrder(root.left, callback, result);
    this.#postOrder(root.right, callback, result);
    result.push(callback(root.data));
  }

  isBalanced() {
    return this.#isBalancedRecursive(this.root);
  }

  #isBalancedRecursive(root) {
    if (root === null) return true;
    let lh = calcHeight(root.left);
    let rh = calcHeight(root.right);
    if (Math.abs(lh - rh) > 1) {
      return false;
    }
    return (
      this.#isBalancedRecursive(root.left) &&
      this.#isBalancedRecursive(root.right)
    );
  }

  rebalance() {
    const arr = this.inOrderForEach((x) => x);
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

function depth(root, value) {
  const node = root.find(value);

  if (node === undefined) {
    return undefined;
  } else {
    const h = calcHeight(node);
    const rootHeight = calcHeight(root.root);
    return rootHeight - h;
  }
}

function calcHeight(node) {
  if (node === null) return -1;

  let lheight = calcHeight(node.left);
  let rheight = calcHeight(node.right);

  return Math.max(lheight, rheight) + 1;
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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function merge(left, right) {
  const merged = [];
  let left_pointer = 0;
  let right_pointer = 0;
  while (left_pointer < left.length && right_pointer < right.length) {
    // Loop as long as both pointers point within array
    if (left[left_pointer] < right[right_pointer]) {
      // add smaller element to merged array and update corresponding pointer
      merged.push(left[left_pointer]);
      left_pointer++;
    } else {
      // add smaller element to merged array and update corresponding pointer
      merged.push(right[right_pointer]);
      right_pointer++;
    }
  }
  if (left_pointer >= left.length) {
    // left array exhausted, copy everything remaining from right subarray
    return merged.concat(right.slice(right_pointer));
  } else {
    // right array exhausted, copy everything remaining from left subarray
    return merged.concat(left.slice(left_pointer));
  }
}

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  } else {
    let left = mergeSort(arr.slice(0, Math.floor(arr.length / 2)));
    let right = mergeSort(arr.slice(Math.floor(arr.length / 2)));
    return merge(left, right);
  }
}

function driver() {
  const arr = [];
  for (let i = 0; i < 100; i++) {
    arr.push(getRandomInt(100));
  }
  const bst = new Tree(arr);
  console.log(bst.isBalanced());
  console.log(bst.preOrderForEach((x) => x));
  console.log(bst.postOrderForEach((x) => x));
  console.log(bst.inOrderForEach((x) => x));
  bst.insert(105);
  bst.insert(114);
  bst.insert(156);
  bst.insert(127);
  console.log(bst.isBalanced());
  bst.rebalance();
  console.log(bst.isBalanced());
  console.log(bst.preOrderForEach((x) => x));
  console.log(bst.postOrderForEach((x) => x));
  console.log(
    inspect(
      bst.inOrderForEach((x) => x),
      { maxArrayLength: null },
    ),
  );
}

driver();
