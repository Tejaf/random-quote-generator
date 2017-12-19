var quotes = [];

let quoteBtn = document.getElementById('randomQuote');
let quoteEl = document.getElementById('quote');

document.addEventListener('DOMContentLoaded', function() {
    readTextFile("./quotes.txt");
    quoteBtn.addEventListener('click', function() {
        var randomNum = randomIntInc(0, quotes.length-1);
        if (quoteEl.innerText === quotes[randomNum].trim()) {
            randomNum = randomIntInc(0, quotes.length-1);
        }
            quoteEl.innerHTML = quotes[randomNum].trim();
    });
})


function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                quotes = allText.split('\n\n');
            }
        }
    }
    rawFile.send(null);
}