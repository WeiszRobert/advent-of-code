const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n\r\n')
    .map(e => e.split('\r\n'))

function checkReflection(array) {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] === array[i+1]) {
            let j = 1
            while (i-j >= 0 && i+1+j < array.length && array[i-j] === array[i+1+j]) {
                j++
            }
            if (i-j < 0 || i+1+j >= array.length) {
                return i+1
            }
        }
    }
    return false
}

let sum = 0
for (let i = 0; i < input.length; i++) {
    let checkNormal = checkReflection(input[i])
    if (checkNormal === false) {
        let transposed = input[i][0].split('').map((_, colIndex) => input[i].map(row => row[colIndex])).map(e => e.join(''))
        sum += checkReflection(transposed)
    } else {
        sum += checkNormal * 100
    }
}
console.log(sum)