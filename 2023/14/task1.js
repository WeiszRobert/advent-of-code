const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

function calculate(count, start, size){
    let sum = 0
    for (let i = 0; i < count; i++) {
        sum += size - start - i
    }
    return sum
}

let sum = 0
for (let i = 0; i < input[0].length; i++) {
    let count = 0
    let start = 0
    for (let j = 0; j < input.length; j++) {

        if (input[j][i] === '#') {
            if (count > 0) {
                sum += calculate(count, start, input.length)
            }
            count = 0
            start = j + 1
        } else if (input[j][i] === 'O') {
            count++
        }

        if (j === input.length - 1 && count > 0) {
            sum += calculate(count, start, input.length)
        }
    }
}
console.log(sum)