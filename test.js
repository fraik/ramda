var test = require('tape');
var R = require('ramda');

test('Testing currying', function(t) {
    var isString = R.is(String);
    t.ok(isString('foo'));
    t.end();
});
