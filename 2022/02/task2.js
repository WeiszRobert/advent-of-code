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
    const rules = [{key: 'A', winIf: 'C', loseIf: 'B', drawIf: 'A', value: 1},
                    {key: 'B', winIf: 'A', loseIf: 'C', drawIf: 'B', value: 2},
                    {key: 'C', winIf: 'B', loseIf: 'A', drawIf: 'C', value: 3}]

    if (b === 'X') {
        /*
            Okay so, we first look up what we need to lose,
            then we look it up, get the value of that and add it to the score plus 0, because we lost.
            The reason why there is a winif, is because if the enemy wins, we lose.
        */
        score += rules.find(elem => elem.key === (rules.find(elem => elem.key === a).winIf)).value + 0
    } else if (b === 'Y') {
        score += rules.find(elem => elem.key === (rules.find(elem => elem.key === a).drawIf)).value + 3
    } else if (b === 'Z') {
        score += rules.find(elem => elem.key === (rules.find(elem => elem.key === a).loseIf)).value + 6
    }

    return score;
}