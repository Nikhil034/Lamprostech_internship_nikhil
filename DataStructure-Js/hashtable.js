//Example 1
const normalObj = {}; // create a normal object
const nullProtoObj = Object.create(null); // create an object with "null" prototype

console.log(`normalObj is: ${normalObj}`); // shows "normalObj is: [object Object]"
console.log(`nullProtoObj is: ${nullProtoObj}`); // throws error: Cannot convert object to primitive value

alert(normalObj); // shows [object Object]
alert(nullProtoObj); // throws error: Cannot convert object to primitive value



//Example 2
normalObj.valueOf(); // shows {}
nullProtoObj.valueOf(); // throws error: nullProtoObj.valueOf is not a function

normalObj.hasOwnProperty("p"); // shows "true"
nullProtoObj.hasOwnProperty("p"); // throws error: nullProtoObj.hasOwnProperty is not a function

normalObj.constructor; // shows "Object() { [native code] }"
nullProtoObj.constructor; // shows "undefined"


//Example 3

const ages = {};

function hasPerson(name) {
    return name in ages;
}

function getAge(name) {
    return ages[name];
}

hasPerson("hasOwnProperty"); // true
getAge("toString"); // [Function: toString]
