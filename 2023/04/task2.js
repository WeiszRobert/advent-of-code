const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

const re = /\d+/g

let newDeck = new Array(input.length).fill(1)

let sum = 0

input.forEach((e, index) => {
    let numbers = e.split(':')[1].split('|')
    let winningNumbers = numbers[0].match(re)
    let myNumbers = numbers[1].matchAll(re)

    let score = 0
    for (const match of myNumbers) {
        if (winningNumbers.includes(match[0])) {
            score += 1
        }
    }

    for (let i = 1; i <= score; i++) {
        newDeck[index+i] += newDeck[index]
    }
    
    sum += score * newDeck[index]
})

console.log(input.length + sum)