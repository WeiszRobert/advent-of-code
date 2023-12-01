const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input1.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

const re = /\d/g

let sum = 0

input.forEach(e => {
    const match = e.match(re)
    sum += parseInt(match.slice(0, 1) + match.slice(-1))
})

console.log(sum)