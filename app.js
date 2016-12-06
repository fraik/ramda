var R = require('ramda');

// currying 101
function isString(test) {
    return R.is(String, test);
}
console.log(isString('foo'));//=> true

var isString = R.is(String);
console.log(isString('foo'));//=> true


console.log(R.sum(R.range(1, 5)));//=> 10
