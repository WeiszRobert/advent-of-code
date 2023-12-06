const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

const re = /\d+/g

const times = input[0].match(re).map(e => parseInt(e))
const distances = input[1].match(re).map(e => parseInt(e))

let result = 1

for (let i = 0; i < times.length; i++) {
    let count = 0
    for (let j = 0; j < times[i]; j++) {
        let timeleft = times[i] - j
        let traveled = j * timeleft
        
        if (timeleft <= distances[i] && traveled > distances[i]) {
            count++
        }
    }
    result *= count
}
console.log(result)