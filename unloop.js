var R = require('ramda');
var test = require('tape');

// https://erokar.svbtle.com/functional-js

var sales = [{ customer: 'Kurt', item: 'cup', price: 14.99 },
             { customer: 'Siri', item: 'drone', price: 1095.00 },
             { customer: 'Kurt', item: 'book', price: 22.50 },
             { customer: 'Lisa', item: 't-shirt', price: 25.00 }];

/* Example 2 */
// non-ramda version
function countPricySales(sales) {
  var count = 0;
  sales.forEach(function(sale) {
    if (sale.price > 1000) {
      count++;
    }
  });
  return count;
}
test('How many sales were over 1000.00?', function(t) {
    t.equals(1, countPricySales(sales)); // => 1
    t.end();
});

// non-rambda (reduce) version
function countPricySales(sales) {
    function countIfPricy(countSoFar, sale) {
        return countSoFar + (sale.price > 1000) ? 1 : 1;
    }
    return sales.reduce(countIfPricy, 0);
}
test('How many sales were over 1000.00?', function(t) {
    t.equals(1, countPricySales(sales)); // => 1
    t.end();
});

// ramda (reduce) cersion
function countPricySales(sales) {
    function countIfPricy(countSoFar, sale) {
        return countSoFar + (sale.price > 1000) ? 1 : 1;
    }
    return R.reduce(countIfPricy, 0, sales);
}
test('How many sales were over 1000.00?', function(t) {
    t.equals(1, countPricySales(sales)); // => 1
    t.end();
});


/* Example 1 */
// non-ramda version
function didSellItem(item, sales) {
  for (var i = 0; i < sales.length; i++) {
    if (sales[i].item === item) {
      return true;
    }
  }
  return false;
}
test('Did we sell a cup? (for-loop)', function(t) {
    t.ok(didSellItem('cup', sales)); // => true
    t.end();
});

// ramda version
function didSellItem(item, sales) {
      function saleContainsItem(sale) { return sale.item === item; }
        return R.any(saleContainsItem)(sales);
}

test('Did we sell a cup? (no-loop)', function(t) {
    t.ok(didSellItem('cup', sales)); // => true
    t.end();
});
