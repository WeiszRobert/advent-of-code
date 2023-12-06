const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

const re = /\d+/g

const time = parseInt(input[0].replace(/\s/g, '').match(re)[0])
const distance = parseInt(input[1].replace(/\s/g, '').match(re)[0])

let count = 0
for (let j = 0; j < time; j++) {
    let timeleft = time - j
    let traveled = j * timeleft
    
    if (timeleft <= distance && traveled > distance) {
        count++
    }
}
console.log(count)