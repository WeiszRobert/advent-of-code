const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

function rotate90(matrix) {
    return matrix[0].split('').map((val, index) => matrix.map(row => row[index])).reverse().map(row => row.join(''))
}

function rotateMinus90(matrix) {
    return matrix[0].split('').map((val, index) => matrix.map(row => row[index])).map(row => row.reverse()).map(row => row.join(''))
}

function tilt(matrix) {
    let newMatrix = []
    for (let i = 0; i < matrix[0].length; i++) {
        let column = matrix.map(e => e[i])
        let newColumn = []
        let newTemp = []
        for (let j = 0; j < column.length; j++) {
            if (column[j] === '.') {
                newTemp.push(column[j])

            } else if (column[j] === 'O') {
                newTemp.unshift(column[j])
                
            } else if (column[j] === '#' || j === column.length - 1) {
                newColumn.push(...newTemp, column[j])
                newTemp = []
            }
        }
        if (newTemp.length > 0) {
            newColumn.push(...newTemp)
        }
        newMatrix.push(newColumn)
    }
    return newMatrix[0].map((_, colIndex) => newMatrix.map(row => row[colIndex]).join(''))
}

function rotation(matrix) {
    //first north
    let newinput = tilt(matrix)

    //then west
    newinput = rotateMinus90(newinput)
    newinput = tilt(newinput)
    newinput = rotate90(newinput)
    //then south
    newinput = rotateMinus90(newinput)
    newinput = rotateMinus90(newinput)
    newinput = tilt(newinput)
    newinput = rotate90(newinput)
    newinput = rotate90(newinput)

    //then east
    newinput = rotate90(newinput)
    newinput = tilt(newinput)
    newinput = rotateMinus90(newinput)

    return newinput
}

function hashCode(s) {
    let h
    for(let i = 0; i < s.length; i++) 
        h = Math.imul(31, h) + s.charCodeAt(i) | 0
    return h
}

let hashes = []
let repeatInterval = false
let rotationsperformed = 0
let newinput = input

for (let i = 0; i < 1000000000; i++) {
    newinput = rotation(newinput)
    rotationsperformed++
    let hash = hashCode(newinput.map(e => e.split('').join('')).join(''))
    if (hashes.includes(hash)) {
        repeatInterval = hashes.length - hashes.indexOf(hash)
        //console.log(`repeatInterval is ${repeatInterval} found at ${i}`)
        break
    } else {
        hashes.push(hash)
    }
}

if (repeatInterval) {
    let rotations = rotationsperformed % repeatInterval;
    for (let i = 0; i < rotations; i++) {
        newinput = rotation(newinput);
    }
}

let sum = 0
for (let i = 0; i < newinput.length; i++) {
    sum += newinput[i].split('').filter(e => e === 'O').length * (newinput.length - i)
}
console.log(sum)