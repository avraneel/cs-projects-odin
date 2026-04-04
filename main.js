import { LinkedList } from "./LinkedList.js";

const list = new LinkedList("apple");

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
list.append("badger");

console.log(list.toString());
console.log(list.size());

list.pop();
console.log(list.toString());
console.log(list.size());
console.log(list.contains("parrot"));
console.log(list.contains("penguin"));
console.log(list.toString());
console.log(list.head());
console.log(list.tail());
console.log(list.at(3));
console.log(list.at(33));
console.log(list.findIndex("snake"));
console.log(list.findIndex("man"));

console.log(list.pop());
console.log(list.pop());
console.log(list.pop());
console.log(list.pop());
console.log(list.pop());
console.log(list.pop());
console.log(list.pop());
console.log(list.toString());
console.log(list.head());
console.log(list.tail());
console.log(list.pop());
