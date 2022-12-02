const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

const elfArray = []
elfArray[0] = {values: [], sum: 0, index: 0}
let elfInd = 0
let elfMax = 0

input.forEach((line, index) => {
	if (line === '') {
		elfInd++
		elfArray[elfInd] = {values: [], sum: 0, index: 0}
	} else {
		elfArray[elfInd].values.push(parseInt(line))
		elfArray[elfInd].sum = elfArray[elfInd].values.reduce((a, b) => a + b, 0)
		elfArray[elfInd].index = elfInd
		if (elfArray[elfInd].sum > elfMax) {
			elfMax = elfArray[elfInd].sum
		}
	}
})

const top3 = elfArray.sort((a, b) => b.sum - a.sum).slice(0, 3)
const top3sum = top3.reduce((a, b) => a + b.sum, 0)

console.log(top3sum)
