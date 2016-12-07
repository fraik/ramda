var R = require('ramda');
var test = require('tape');

// https://erokar.svbtle.com/functional-js

var sales = [{ customer: 'Kurt', item: 'cup', price: 14.99 },
             { customer: 'Siri', item: 'drone', price: 1095.00 },
             { customer: 'Kurt', item: 'book', price: 22.50 },
             { customer: 'Lisa', item: 't-shirt', price: 25.00 }];

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
