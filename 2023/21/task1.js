const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

let startingPoint = [0, 0]
for (let i = 0; i < input.length; i++) {
    let start = input[i].indexOf('S')
    if (start !== -1) {
        startingPoint = [i, start]
        break;
    }
}

let currentPoints = [startingPoint]

function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

function checkAround(point){
    let newPoints = []
    let x = point[0]
    let y = point[1]

    //above
    if (x > 0) {
        if ((input[x - 1][y] === '.') || input[x - 1][y] === 'S') {
            newPoints.push([x - 1, y])
        }
    }

    //below
    if (x < input.length - 1) {
        if ((input[x + 1][y] === '.') || input[x + 1][y] === 'S') {
            newPoints.push([x + 1, y])
        }
    }

    //left
    if (y > 0) {
        if ((input[x][y - 1] === '.') || input[x][y - 1] === 'S') {
            newPoints.push([x, y - 1])
        }
    }

    //right
    if (y < input[x].length - 1) {
        if ((input[x][y + 1] === '.') || input[x][y + 1] === 'S') {
            newPoints.push([x, y + 1])
        }
    }

    return newPoints
}

let steps = 64
for (let i = 0; i < steps; i++) {
    let newPoints = []
    currentPoints.forEach(point => {
        newPoints.push(...checkAround(point))
    })
    
    newPoints = newPoints.filter((point, index, self) => {
        return index === self.findIndex((p) => (
            arraysEqual(p, point)
        ))
    })

    currentPoints = newPoints
}
console.log(currentPoints.length)