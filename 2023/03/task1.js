const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

const re = /\d+/g

let array = []

input.forEach(e => {
    array.push(e)
})

const maxCol = array[0].length
const maxRow = array.length

function isSymbol(chr) {
    return isNaN(parseInt(chr)) && chr !== '.'
}

function checkAround(array, row, column, length) {

    if (column > 0 && isSymbol(array[row][column-1])) {
        return true
    } else if (column + length < array[0].length && column+length < maxCol && isSymbol(array[row][column+length])) {
        return true
    }

    for (let i = Math.max(0, column - 1); i <= Math.min(maxCol - 1, column + length); i++) {
        if (row > 0 && isSymbol(array[row - 1][i])) {
            return true
        }
        if (row < maxRow - 1 && isSymbol(array[row + 1][i])) {
            return true
        }
    }

    return false
}

let sum = 0

array.forEach((value, index) => {
    let matches = value.matchAll(re)

    for (const match of matches) {
        if (checkAround(array, index, match.index, match[0].length)) {
            sum += parseInt(match[0])
        }
    }
})

console.log(sum)