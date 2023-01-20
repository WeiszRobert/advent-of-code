const path = require('path');
const fs = require('fs');

let score = 0;
let input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n');
    
//console.log(input)
input = input.map((line) => {
    if (line !== '') {
        let values = line.split(' ')
        score += getScore(values[0], values[1])
    }
});

console.log(score)

function getScore(a, b) {
    let score = 0;

    //Rock Paper Scissors
    const oppvals = [{key: 'A', winIf: 'Z', loseIf: 'Y', drawIf: 'X'},
                    {key: 'B', winIf: 'X', loseIf: 'Z', drawIf: 'Y'},
                    {key: 'C', winIf: 'Y', loseIf: 'X', drawIf: 'Z'}]
    const myvals  = [{key: 'X', value: 1}, {key: 'Y', value: 2}, {key: 'Z', value: 3}]

    score += myvals.find(elem => elem.key === b).value
    
    if (oppvals.find(elem => elem.key === a).loseIf === b) {
        score += 6
    } else if (oppvals.find(elem => elem.key === a).drawIf === b) {
        score += 3
    } else if (oppvals.find(elem => elem.key === a).winIf === b) {
        score += 0
    }

    return score;
}