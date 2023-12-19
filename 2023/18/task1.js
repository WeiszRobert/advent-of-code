const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

const re = /R|D|L|U|\d+|#\w+/g

function getCharFromDir(lastDir, nextDir) {
    let asd = ''
    if (lastDir === 'R') {
        if (nextDir === 'D') {
            asd = '7'
        } else if (nextDir === 'U') {
            asd = 'J'
        }
    } else if (lastDir === 'D') {
        if (nextDir === 'L') {
            asd = 'J'
        } else if (nextDir === 'R') {
            asd = 'L'
        }
    } else if (lastDir === 'L') {
        if (nextDir === 'D') {
            asd = 'F'
        } else if (nextDir === 'U') {
            asd = 'L'
        }
    } else if (lastDir === 'U') {
        if (nextDir === 'L') {
            asd = '7'
        } else if (nextDir === 'R') {
            asd = 'F'
        }
    }
    return asd
}

const points = []
let firstInstructions = input[0].match(re)
let firstChar = ''
let currentPoint = { x: 0, y: 0}
switch (firstInstructions[0]) {
    case 'R':
        firstChar = "-"
        break;
    case 'D':
        firstChar = "|"
        break;
    case 'L':
        firstChar = "-"
        break;
    case 'U':
        firstChar = "|"
        break;
}
currentPoint.char = firstChar

points.push(currentPoint)

let firstDir = firstInstructions[0]
let lastDir = input[input.length - 1].match(re)[0]

for (let i = 0; i < input.length; i++) {
    let instructions = input[i].match(re)
    let instructionsNext = i < input.length - 1 ? input[i+1].match(re) : undefined
    let char = ''
    for (let j = 0; j < instructions[1]; j++) {
        switch (instructions[0]) {
            case 'R':
                currentPoint.x++
                char = "-"
                break;
            case 'D':
                currentPoint.y--
                char = "|"
                break;
            case 'L':
                currentPoint.x--
                char = "-"
                break;
            case 'U':
                currentPoint.y++
                char = "|"
                break;
        }
        if (instructionsNext && j === instructions[1] - 1) {
            let lastDir = instructions[0]
            let nextDir = instructionsNext[0]
            char = getCharFromDir(lastDir, nextDir)
        } 
        points.push({ x: currentPoint.x, y: currentPoint.y, char: char })
    }
}

points[points.length - 1].char = getCharFromDir(lastDir, firstDir)

let minX = Math.min(...points.map(p => p.x))
let maxX = Math.max(...points.map(p => p.x))
let minY = Math.min(...points.map(p => p.y))
let maxY = Math.max(...points.map(p => p.y))

const grid = []
for (let i = 0; i < maxY - minY + 1; i++) {
    grid.push([])
    for (let j = 0; j < maxX - minX + 1; j++) {
        grid[i].push('.')
    }
}

let borderCount = 0
for (let i = 0; i < points.length; i++) {
    grid[maxY - points[i].y][maxX - points[i].x] = points[i].char
    borderCount++
}

let sum = 0
grid.forEach((row) => {
    let inside = false
    let counter = 0
    let stack = []
    row.reverse().forEach((item) => {
        if (item === '.' && inside){
            counter++
            stack = []
        } else {
            if (item === '|') {
                inside = !inside
            } else if (item === '7' && stack.length > 0 && stack[0] === 'F') {
                stack = []
            } else if (item === 'J' && stack.length > 0 && stack[0] === 'F') {
                inside = !inside
                stack = []
            } else if (item === '7' && stack.length > 0 && stack[0] === 'L') {
                inside = !inside
                stack = []
            } else if (item === 'J' && stack.length > 0 && stack[0] === 'L') {
                stack = []
            } else if (item !== '.') {
                stack.push(item)
            }
        }
    })
    sum += counter
})
borderCount--
console.log(sum + borderCount)