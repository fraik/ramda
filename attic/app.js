var R = require('ramda');

// currying 101
function isString(test) {
    return R.is(String, test);
}
var result = isString('foo');
console.log(result);//=> true


// arguably more readable
var isString = R.is(String);
var result = isString('foo');
console.log(result);//=> true

// :: [Number] -> [a] -> [a]
var pickIndexes = R.compose(R.values, R.pickAll);
var result = pickIndexes([0, 2], ['a', 'b', 'c']); // => ['a', 'c']

console.log(R.map(R.call, R.repeat(Math.random, 5)));
