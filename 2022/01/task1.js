const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

const elfArray = []
elfArray[0] = []
let elfInd = 0
let elfMax = 0

input.forEach((line, index) => {
	if (line === '') {
		elfInd++
		elfArray[elfInd] = []
	} else {
		elfArray[elfInd].push(parseInt(line))
		let sum = elfArray[elfInd].reduce((a, b) => a + b, 0)
		if (sum > elfMax) {
			elfMax = sum
		}
	}
})

console.log(elfMax)
