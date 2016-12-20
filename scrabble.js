var scrabble = function(steentjes, zoekwoord) {

    // maak een hash met teller voor elke unieke letter
    var telLetters = woord => woord.split('').reduce((hash,elt) => hash[elt] ?
            (hash[elt]++,hash) :
            (hash[elt] = 1,hash),{});

    t = telLetters(steentjes);
    w = telLetters(zoekwoord);

    var enough = letter => t[letter]>=w[letter];
    var boyAND = (x,y)  => x && y;  // geleend van boy ;)

    return zoekwoord.split('').map(enough).reduce(boyAND);
}

console.log(scrabble('wfboaor', 'foo'));
console.log(scrabble('foboar', 'fooz'));

//console.log(scrabble("ladilmy", "daily"));   // -> true
//console.log(scrabble("ladilmy", "zwedaily"));// -> false
//console.log(scrabble("eerriin", "eerie"));   // -> false
//console.log(scrabble("orrpgma", "program")); // -> true
//console.log(scrabble("orppgma", "program")); // -> false

// TODO bonus 1 (blanco steentjes)
/*
scrabble("pizza??", "pizzazz") -> true
scrabble("piizza?", "pizzazz") -> false
scrabble("a??????", "program") -> true
scrabble("b??????", "program") -> false
*/

// TODO bonus 2 (langste woord)
/*
longest("dcthoyueorza") ->  "coauthored"
longest("uruqrnytrois") -> "turquois"
longest("rryqeiaegicgeo??") -> "greengrocery"
longest("udosjanyuiuebr??") -> "subordinately"
longest("vaakojeaietg????????") -> "ovolactovegetarian"
*/

// TODO bonus 3 (hoogste woordscore)
/*
highest("dcthoyueorza") ->  "zydeco"
highest("uruqrnytrois") -> "squinty"
highest("rryqeiaegicgeo??") -> "reacquiring"
highest("udosjanyuiuebr??") -> "jaybirds"
highest("vaakojeaietg????????") -> "straightjacketed"
*/
