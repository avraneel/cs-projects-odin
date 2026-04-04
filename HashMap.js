import { LinkedList } from "./LinkedList.js";

export class HashMap {
  constructor(loadFactor, capacity) {
    this.loadFactor = loadFactor ?? 0.75;
    this.capacity = capacity ?? 16;
    this.buckets = Array(this.capacity);
  }

  checkBounds(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  rehash() {
    const backupBuckets = JSON.parse(JSON.stringify(this.buckets));
    this.capacity *= 2;
    this.buckets = Array(this.capacity);
    backupBuckets.forEach((bucket) => {
      // undefined isnt valid JSON value. If undefined is occured during array, it
      // is converted to null
      if (bucket !== null) {
        let pointer = bucket.headNode;
        while (pointer !== null) {
          //const newIndex = this.hash(pointer.value.key);
          this.set(pointer.value.key, pointer.value.value);
          pointer = pointer.nextNode;
        }
      }
      //const index = this.hash(item);
      //this.buckets[index] = item;
    });
  }

  set(key, value) {
    const index = this.hash(key);
    this.checkBounds(index);

    if (this.buckets[index] === undefined) {
      // bucket is empty, insert a linked list
      const ll = new LinkedList({ key: key, value: value });
      this.buckets[index] = ll;
    } else {
      // bucket already has a linked list
      let pointer = this.buckets[index].headNode;
      while (pointer !== null) {
        if (pointer.value.key === key) {
          // if key exists, then overwrite
          pointer.value.value = value;
          return;
        }
        pointer = pointer.nextNode;
      }
      // at this point, key does not exist. So append
      this.buckets[index].append({ key: key, value: value });
    }
    if (this.length() > this.capacity * this.loadFactor) {
      this.rehash();
    }
  }

  get(key) {
    const index = this.hash(key);
    this.checkBounds(index);
    if (this.buckets[index] !== undefined) {
      // If bucket is non-empty then search through the list
      let pointer = this.buckets[index].headNode;
      while (pointer !== null) {
        // Iterate through the list
        if (key === pointer.value.key) {
          return pointer.value.value;
        }
        pointer = pointer.nextNode;
      }
    } else {
      return null;
    }
  }

  has(key) {
    const index = this.hash(key);
    this.checkBounds(index);
    // jump to the bucket index
    const chainHead = this.buckets[index];
    return chainHead.contains(key);
  }

  remove(key) {
    const index = this.hash(key);
    this.checkBounds(index);
    const chainHead = this.buckets[index].headNode;
    if (chainHead === null) {
      // already empty, nothing to do
      return false;
    } else if (chainHead.nextNode === null) {
      // if only 1 element exists in bucket
      this.buckets[index] = undefined;
      return true;
    } else {
      // if bucket has > 1 size linked list
      let pointer = chainHead;
      if (pointer.value.key === key) {
        // if head is the node to be deleted
        this.buckets[index].headNode = this.buckets[index].headNode.nextNode;
        return true;
      }
      while (pointer.nextNode.value.key !== key) {
        // iterate to the previous node before the node to be deleted
        pointer = pointer.nextNode;
      }
      // now node is at previous node of the node to be deleted
      pointer.nextNode = pointer.nextNode.nextNode;
      return true;
    }
  }

  length() {
    let count = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] != undefined) {
        count += this.buckets[i].size();
      }
    }
    return count;
  }

  clear() {
    for (let i = 0; i < this.buckets.capacity; i++) {
      buckets[i] = undefined;
    }
  }

  keys() {
    const arr = [];
    this.buckets.forEach((bucket) => {
      if (bucket != undefined) {
        let pointer = bucket.headNode;
        while (pointer != null) {
          arr.push(pointer.value.key);
          pointer = pointer.nextNode;
        }
      }
    });
    return arr;
  }

  values() {
    const arr = [];
    this.buckets.forEach((bucket) => {
      if (bucket != undefined) {
        let pointer = bucket.headNode;
        while (pointer != null) {
          arr.push(pointer.value.value);
          pointer = pointer.nextNode;
        }
      }
    });
    return arr;
  }

  entries() {
    const arr = [];
    this.buckets.forEach((bucket) => {
      if (bucket != undefined) {
        let pointer = bucket.headNode;
        while (pointer != null) {
          arr.push([pointer.value.key, pointer.value.value]);
          pointer = pointer.nextNode;
        }
      }
    });
    return arr;
  }
}
