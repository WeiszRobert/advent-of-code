const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

const re = /\d+/g

let array = []
let symbolsarray = []

input.forEach(e => {
    array.push(e)
    symbolsarray.push(Array.from({length: e.length}, () => []))
})

const maxCol = array[0].length
const maxRow = array.length

function isAsterisk(chr) {
    return chr === '*'
}

function checkAround(array, row, column, length, number) {

    if (column > 0 && isAsterisk(array[row][column-1])) {
        symbolsarray[row][column-1].push(number)
    } else if (column + length < array[0].length && column+length < maxCol && isAsterisk(array[row][column+length])) {
        symbolsarray[row][column+length].push(number)
    }

    for (let i = Math.max(0, column - 1); i <= Math.min(maxCol - 1, column + length); i++) {
        if (row > 0 && isAsterisk(array[row - 1][i])) {
            symbolsarray[row - 1][i].push(number)
        }
        if (row < maxRow - 1 && isAsterisk(array[row + 1][i])) {
            symbolsarray[row + 1][i].push(number)
        }
    }
}

array.forEach((value, index) => {
    let matches = value.matchAll(re)

    for (const match of matches) {
        checkAround(array, index, match.index, match[0].length, match[0])
    }
})

let sum = 0

symbolsarray.forEach(e => {
    e.forEach(f => {
        if (f.length === 2) {
            sum += (parseInt(f[0]) * parseInt(f[1]))
        }
    })
})

console.log(sum)