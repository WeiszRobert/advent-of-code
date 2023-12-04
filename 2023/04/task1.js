const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

const re = /\d+/g

let sum = 0

input.forEach(e => {
    let numbers = e.split(':')[1].split('|')
    let winningNumbers = numbers[0].match(re)
    let myNumbers = numbers[1].matchAll(re)

    let score = 0

    for (const match of myNumbers) {
        if (winningNumbers.includes(match[0])) {
            score = (score === 0) ? 1 : score * 2;
        }
    }

    sum += score
})

console.log(sum)