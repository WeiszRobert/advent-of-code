const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

const re = /\w+/g

const order = input[0].split('')
const directions = input.slice(2).reduce((acc, e) => {
    let values = e.match(re)
    acc[values[0]] = {
        L: values[1],
        R: values[2]
    }
    return acc
}, {});

let ind = 0
let found = false
let current = directions['AAA'][order[ind]]

while (!found) {
    ind++
    let next = directions[current][order[ind % order.length]]
    if (next === 'ZZZ') {
        found = true
    } else {
        current = next
    }
}

console.log(ind+1)