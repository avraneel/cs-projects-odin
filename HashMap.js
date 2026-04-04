export class HashMap {
  constructor(loadFactor, capacity) {
    this.loadFactor = loadFactor ?? 0.75;
    this.capacity = capacity ?? 16;
    this.data = Array(this.capacity);
  }

  checkBounds(index) {
    if (index < 0 || index >= this.data.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
      console.log(hashCode);
    }
    return hashCode;
  }

  rehash() {
    const backup = JSON.parse(JSON.stringify(this.data));
    this.capacity *= 2;
    this.data = Array(this.capacity);
    backup.forEach((item) => {
      const index = this.hash(item);
      this.data[index] = item;
    });
  }

  set(key, value) {
    const index = this.hash(key);
    this.checkBounds(index);
    this.data[index] = { key: key, value: value };
    if (this.length() > this.capacity * this.loadFactor) {
      this.rehash();
    }
  }

  get(key) {
    const index = this.hash(key);
    if (data[index]) return data[index].value;
    else return null;
  }

  has(key) {
    const index = this.hash(key);
    const val = this.data[index].value;
    return val == undefined ? false : true;
  }

  remove(key) {
    const index = this.hash(key);
    const val = this.data[index].value;
    if (val != undefined) {
      // key found
      this.data[index] = undefined;
      return true;
    } else {
      return false;
    }
  }

  length() {
    let count = 0;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] != undefined) {
        count++;
      }
    }
    return count;
  }

  clear() {
    for (let i = 0; i < this.data.capacity; i++) {
      data[i] = undefined;
    }
  }

  keys() {
    const arr = [];
    this.data.forEach((element) => {
      if (element != undefined) arr.push(element.key);
    });
    return arr;
  }

  values() {
    const arr = [];
    this.data.forEach((element) => {
      if (element != undefined) arr.push(element.value);
    });
    return arr;
  }

  entries() {
    const arr = [];
    this.data.forEach((element) => {
      if (element != undefined) {
        const item = [element.key, element.value];
        arr.push(item);
      }
    });
    return arr;
  }
}
