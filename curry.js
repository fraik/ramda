var R = require('ramda');
var curry = R.curry;

var formatName = curry(function(first, middle, last) {
    return first + " " + middle + " " + last;
});

var f = formatName("James");           // returns a function
var g = f("Earl");                     // returns a function
console.log(g("Jones"));                            //=> "James Earl Jones"

var h = formatName("James", "Earl");   // returns a function
console.log(h("Jones"));                            //=> "James Earl Jones"

// Note that g and h are equivalent functions
console.log(formatName("James", "Earl", "Jones"));  //=> "James Earl Jones"
