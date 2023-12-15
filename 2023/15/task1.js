const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split(',')

function hashString(s) {
    let h = 0
    for(let i = 0; i < s.length; i++) {
        h += s.charCodeAt(i)
        h *= 17
        h %= 256
    }
    return h
}

const result = input.reduce((acc, curr) => acc + hashString(curr), 0)

console.log(result)