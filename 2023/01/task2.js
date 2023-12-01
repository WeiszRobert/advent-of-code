const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input1.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

const re1 = /\d|one|two|three|four|five|six|seven|eight|nine/g
const re2 = /\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g

const digits = {
	one: '1',
	two: '2',
	three: '3',
	four: '4',
	five: '5',
	six: '6',
	seven: '7',
	eight: '8',
	nine: '9'
};

let sum = 0

function todigit(str) {
	return isNaN(parseInt(str)) ? digits[str] : str[0];
}

input.forEach(e => {
    const match1 = e.match(re1)
	const match2 = e.split('').reverse().join('').match(re2)
    sum += parseInt(todigit(match1.slice(0, 1)) + todigit(match2[0].split('').reverse().join('')))
})

console.log(sum)