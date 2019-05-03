const R = require('ramda');

const toInt = (str) => parseInt(str);
const triple = R.compose(R.multiply(3), toInt);
const id = R.compose(R.identity, toInt);
const addOne = R.add(1);
const isEven = R.pipe(R.modulo(R.__,2), R.equals(0));
const isOdd = R.complement(isEven);
const indexOdd = R.compose(isOdd, addOne);
const tripleOddPos = (val, idx) => (indexOdd(idx)) ? triple(val) : id(val);
const moduloTen = R.modulo(R.__, 10);
const rmCheckDigit = R.dropLast(1);
const readCheckDigit = R.compose(id, R.last);
const restCheck = R.ifElse(R.equals(0), R.identity, R.subtract(10));
const calcCheckDigit = R.pipe(
  rmCheckDigit,
  R.addIndex(R.map)(tripleOddPos),
  R.sum,
  moduloTen,
  restCheck
);
const validate = (code) => R.equals(readCheckDigit(code), calcCheckDigit(code));

const barCode = '5901234123457';
console.log(validate(barCode));
