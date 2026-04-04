import { HashMap } from "./HashMap.js";

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());

test.set("elephant", "circus");
console.log(`Load now: ${test.length() / test.capacity}`);
console.log(test.get("elephant"));
console.log(test.length());

test.set("moon", "silver");
console.log(test.length());
console.log(test.capacity);
console.log(`Load now: ${test.length() / test.capacity}`);

test.set("kite", "new year");
test.set("dog", "pet");
test.set("lion", "natgeo");
console.log(test.get("kite"));
console.log(test.get("dog"));
console.log(test.get("lion"));
console.log(test.length());
console.log(test.remove("lion"));
// test.keys().forEach((el) => {
//   console.log(`${el} ${test.hash(el)}`);
// });

// console.log(test.hash("apple"));
// console.log(test.hash("banana"));
