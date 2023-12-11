const path = require('path');
const fs = require('fs');

let input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

let isOnlySpaceCol = []

for (let i = 0; i < input[0].length; i++) {
    let isOnlySpace = true
    for (let j = 0; j < input.length; j++) {
        isOnlySpace = isOnlySpace && input[j].split('')[i] === '.'
    }
    if (isOnlySpace) {
        isOnlySpaceCol.push(i)
    }
}

isOnlySpaceCol.forEach((e, eind) => {
    input.forEach((row, ind) => {
        input[ind] = row.substring(0, e + 1 + eind) + '.' + row.substring(e + 1 + eind)
    })
})

for (let i = 0; i < input.length; i++) {
    if (input[i] === '.'.repeat(input[i].length)) {
        input.splice(i, 0, '.'.repeat(input[i].length))
        i++
    }
}


let galaxies = []
for (let i = 0; i < input[0].length; i++) {
    let isOnlySpace = true
    for (let j = 0; j < input.length; j++) {
        isOnlySpace = isOnlySpace && input[j].split('')[i] === '.'
        if (input[j].split('')[i] === '#') {
            galaxies.push({x: j, y: i})
        }
    }
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