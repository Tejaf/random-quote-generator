var quotes = [];
var authors = [];

let quoteBtn = document.getElementById('randomQuote');
let quoteEl = document.getElementById('quote');
let authorEl = document.getElementById('author');

document.addEventListener('DOMContentLoaded', function() {
    readQUoteFromFile("./quote.txt");
    readAuthorFromFile("./author.txt");
    let quotePlusAuthor = _.zip(quotes, authors);

    quoteEl.innerHTML = quotePlusAuthor[0][0].trim();
    authorEl.innerHTML = quotePlusAuthor[0][1].trim();

    quoteBtn.addEventListener('click', function() {
        var randomNum = randomIntInc(0, quotePlusAuthor.length-1);
        if (quotePlusAuthor[randomNum][0] !== '') {
            if (quoteEl.innerText === quotePlusAuthor[randomNum][0].trim()) {
                randomNum = randomIntInc(0, quotes.length-1);
            }
            quoteEl.innerHTML = quotePlusAuthor[randomNum][0].trim();
            authorEl.innerHTML = quotePlusAuthor[randomNum][1].trim();
        }   
    });
})


function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function readQUoteFromFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                quotes = allText.split('\n');
            }
        }
    }
    rawFile.send(null);
}

function readAuthorFromFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                authors = allText.split('\n');
            }
        }
    }
    rawFile.send(null);
}