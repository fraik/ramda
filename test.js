var test = require('tape');
var R = require('ramda');

test('Testing currying', function(t) {
    var isString = R.is(String);
    t.ok(isString('foo'));
    t.end();
});

test('Pick values from list by indexes', function(t) {
	// :: [Number] -> [a] -> [a]
	var pickIndexes = R.compose(R.values, R.pickAll);

	var result = pickIndexes([0, 2], ['a', 'b', 'c']); // => ['a', 'c']

	t.deepEqual(result, ['a', 'c']);
    t.end();
});

test('Create a list function', function(t) {
    // list :: a... -> [a...]
    var list = R.unapply(R.identity);

    var result = list(1,2,3); // => [1, 2, 3]

    t.deepEqual(result, [1, 2, 3]);
    t.end();
});

test('Get an object\'s method names', function(t) {
    // methodNames :: Object -> [String]
    var methodNames = R.compose(R.keys, R.pickBy(R.is(Function)));

    var obj = {
        foo: true,
        bar: function() {},
        baz: function() {},
    };

    t.deepEqual(methodNames(obj), ['bar', 'baz']);
    t.end();
});
