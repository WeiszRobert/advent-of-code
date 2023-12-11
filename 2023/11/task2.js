const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

const modifier = 1000000

let isOnlySpaceCol = []

for (let i = 0; i < input[0].length; i++) {
    let isOnlySpace = true
    let j = 0
    while (isOnlySpace && j < input.length) {
        isOnlySpace = input[j].split('')[i] === '.'
        j++
    }
    if (isOnlySpace) {
        isOnlySpaceCol.push(i)
    }
}

let isOnlySpaceRow = []
for (let i = 0; i < input.length; i++) {
    if (input[i] === '.'.repeat(input[i].length)) {
        isOnlySpaceRow.push(i)
    }
}

let galaxies = []
for (let i = 0; i < input[0].length; i++) {
    for (let j = 0; j < input.length; j++) {
        if (input[j].split('')[i] === '#') {
            galaxies.push({x: j, y: i})
        }
    }
}

for (let i = 0; i < galaxies.length; i++) {
    let prevx = galaxies[i].x
    let prevy = galaxies[i].y
    let lessThanx = isOnlySpaceRow.filter(e => e < prevx).length
    let lessThany = isOnlySpaceCol.filter(e => e < prevy).length
    galaxies[i].x += lessThanx * (modifier-1)
    galaxies[i].y += lessThany * (modifier-1)
}

function getDistance(point1, point2) {
    return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y)
}

let sum = 0
for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
        sum += getDistance(galaxies[i], galaxies[j])
    }
}

console.log(sum)