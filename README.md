# ramda

Trying out basic ramdajs things.

## Getting Started

Run the ean13 mod10 checksum calculator in the [REPL][REPL] or with `node luhn.js`

[REPL]:https://ramdajs.com/repl/#?const%20toInt%20%3D%20%28str%29%20%3D%3E%20parseInt%28str%29%0Aconst%20triple%20%3D%20compose%28multiply%283%29%2C%20toInt%29%0Aconst%20id%20%3D%20compose%28identity%2C%20toInt%29%0Aconst%20addOne%20%3D%20add%281%29%0Aconst%20isEven%20%3D%20pipe%28modulo%28__%2C2%29%2C%20equals%280%29%29%0Aconst%20isOdd%20%3D%20complement%28isEven%29%0Aconst%20indexOdd%20%3D%20compose%28isOdd%2C%20addOne%29%0Aconst%20tripleOddPos%20%3D%20%28val%2C%20idx%29%20%3D%3E%20%28indexOdd%28idx%29%29%20%3F%20triple%28val%29%20%3A%20id%28val%29%3B%0Aconst%20moduloTen%20%3D%20modulo%28__%2C%2010%29%0Aconst%20rmCheckDigit%20%3D%20dropLast%281%29%0Aconst%20readCheckDigit%20%3D%20compose%28id%2C%20last%29%0Aconst%20restCheck%20%3D%20ifElse%28equals%280%29%2C%20identity%2C%20subtract%2810%29%29%0Aconst%20calcCheckDigit%20%3D%20pipe%28%0A%20%20rmCheckDigit%2C%0A%20%20addIndex%28map%29%28tripleOddPos%29%2C%0A%20%20sum%2C%0A%20%20moduloTen%2C%0A%20%20restCheck%0A%29%0Aconst%20validate%20%3D%20%28code%29%20%3D%3E%20equals%28readCheckDigit%28code%29%2C%20calcCheckDigit%28code%29%29%0A%0Aconst%20barCode%20%3D%20%27036000241457%27%0Avalidate%28barCode%29
