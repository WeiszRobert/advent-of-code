const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n\r\n')
    .map(e => e.split('\r\n'))

function diffPositions(str1, str2) {
    return [...str1].reduce((count, char, i) => count + (char !== str2[i]), 0)
}

function checkReflection(array) {
    for (let i = 0; i < array.length - 1; i++) {
        let fixed = 0
        let diff = diffPositions(array[i], array[i+1])
        if (diff === 1 || diff === 0) {
            if (diff === 1) {
                fixed++
            }
            let j = 1
            while (i-j >= 0 && i+1+j < array.length && fixed <= 1 && ((diffPositions(array[i-j], array[i+1+j]) === 1) || array[i-j] === array[i+1+j])) {
                if (diffPositions(array[i-j], array[i+1+j]) === 1) {
                    fixed++
                }
                j++
            }
            if ((i-j < 0 || i+1+j >= array.length) && fixed === 1) {
                return i+1
            }
        }
    }
    return false;
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