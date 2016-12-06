var R = require('ramda');

var isString = R.is(String);
var result = isString('foo'); // => true

console.log(result);
