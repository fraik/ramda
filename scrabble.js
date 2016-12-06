var R = require('ramda');

// /r/dailyprogrammer #294
// https://www.reddit.com/r/dailyprogrammer/comments/5go843/20161205_challenge_294_easy_rack_management_1/

// TODO clean up and use Ramda
var scrabble = function(steentjes, zoekwoord) {

    // hou een teller bij voor elke unieke letter
    var telLetters = woord => woord.split('').reduce((hash,elt) => hash[elt] ?
            (hash[elt]++,hash) :
            (hash[elt] = 1,hash),{});

    t = telLetters(steentjes); // [ 'a', 'a', 'b' ] => { 'a': 2, 'b': 1}
    w = telLetters(zoekwoord); // [ 'a', 'b', 'b' ] => { 'a': 1, 'b': 2}

    // kijk voor elke unieke letter of deze vaak genoeg voorkomt op je plankje
    for(letter in w) {

        // hoeveel keer hebben we deze letter nodig?
        aantalNodig = w[letter];

        // indien we niet voldoende van deze letter hebben op ons plankje, exit
        if(R.isNil(t[letter]) || t[letter]<aantalNodig){
            return false;
        }
    }

    // blijkbaar alle letters gevonden
    return true;
}

console.log(scrabble("ladilmy", "daily"));   // -> true
console.log(scrabble("eerriin", "eerie"));   // -> false
console.log(scrabble("orrpgma", "program")); // -> true
console.log(scrabble("orppgma", "program")); // -> false

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
