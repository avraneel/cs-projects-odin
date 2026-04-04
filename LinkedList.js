import { Node } from "./Node.js";

export class LinkedList {
  constructor(value) {
    this.headNode = new Node(value);
  }

  // tested
  append(value) {
    let pointer = this.headNode;
    while (pointer.nextNode != null) {
      pointer = pointer.nextNode;
    }
    pointer.nextNode = new Node(value);
    return this.headNode;
  }

  // tested
  prepend(value) {
    let newNode = new Node(value);
    newNode.nextNode = this.headNode;
    this.headNode = newNode;
  }

  // tested
  size() {
    let count = 0;
    if (this.headNode === null) {
      return 0;
    } else {
      let pointer = this.headNode;
      while (pointer !== null) {
        pointer = pointer.nextNode;
        count++;
      }
    }
    return count;
  }

  // tested
  head() {
    if (!this.headNode) {
      return undefined;
    } else {
      return this.headNode.value;
    }
  }

  // tested
  tail() {
    if (!this.headNode) {
      return undefined;
    }
    let pointer = this.headNode;
    while (pointer.nextNode !== null) {
      pointer = pointer.nextNode;
    }
    return pointer.value;
  }

  // tested
  at(index) {
    let count = 0;
    let pointer = this.headNode;
    while (pointer !== null) {
      if (count == index) {
        return pointer.value;
      }
      pointer = pointer.nextNode;
      count++;
    }
    return undefined;
  }

  // tested
  toString() {
    let string = "";
    let pointer = this.headNode;
    while (pointer !== null) {
      string += `( ${pointer.value} ) -> `;
      pointer = pointer.nextNode;
    }
    string += `${pointer}`;
    return string;
  }

  // tested
  pop() {
    if (!this.headNode) {
      return undefined;
    } else {
      const val = this.headNode.value;
      this.headNode = this.headNode.nextNode;
      return val;
    }
  }

  // tested
  contains(value) {
    let pointer = this.headNode;
    while (pointer !== null) {
      if (pointer.value === value) {
        return true;
      }
      pointer = pointer.nextNode;
    }
    return false;
  }

  // tested
  findIndex(value) {
    let index = 0;
    let pointer = this.headNode;
    while (pointer !== null) {
      if (pointer.value === value) {
        return index;
      }
      index++;
      pointer = pointer.nextNode;
    }
    return -1;
  }
}
