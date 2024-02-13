//Example 1
const object1 = {
    a: 'somestring',
    b: 42,
};

for (const [key, value] of Object.entries(object1)) {
    console.log(`${key}: ${value}`);
}

//Example 2
const obj = {
    prop: 42,
};

Object.freeze(obj);

obj.prop = 33;
// Throws an error in strict mode

console.log(obj.prop);
// Expected output: 42


//Example 3
const object2 = {
    prop: 'exists',
};

console.log(Object.hasOwn(object1, 'prop'));
// Expected output: true

console.log(Object.hasOwn(object1, 'toString'));
// Expected output: false

console.log(Object.hasOwn(object1, 'undeclaredPropertyValue'));



//Example 4
function MyNumberType(n) {
    this.number = n;
}

MyNumberType.prototype.valueOf = function () {
    return this.number;
};

const object3 = new MyNumberType(4);

console.log(object3 + 3);