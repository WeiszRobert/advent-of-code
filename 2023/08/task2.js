const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

const re = /\w+/g

function gcd(a, b) {
    if (b === 0) {
        return a
    }
    return gcd(b, a % b)
}

function lcm(a, b) {
    return a * b / gcd(a, b)
}

const order = input[0].split('')
const directions = input.slice(2).reduce((acc, e) => {
    let values = e.match(re)
    acc[values[0]] = {
        L: values[1],
        R: values[2]
    }
    return acc
}, {});

const endsWithA = Object.keys(directions).filter(e => e[2] === 'A')

const lengths = endsWithA.map((start) => {
    let current = start
    let ind = 0
    while (current[2] !== 'Z') {
        current = directions[current][order[ind % order.length]]
        ind++
    }
    return ind
});

console.log(lengths.reduce((acc, e) => lcm(acc, e), 1))