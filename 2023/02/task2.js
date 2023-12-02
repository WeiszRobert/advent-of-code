const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

const re = /\d+/g

const rered = /\d+ red/g
const regreen = /\d+ green/g
const reblue = /\d+ blue/g

let result = 0

input.forEach(e => {
    let gamedata = e.split(':')

    let redMax = Math.max(...gamedata[1].match(rered).map(e => parseInt(e.match(re))))
    let greenMax = Math.max(...gamedata[1].match(regreen).map(e => parseInt(e.match(re))))
    let blueMax = Math.max(...gamedata[1].match(reblue).map(e => parseInt(e.match(re))))

    result += (redMax * greenMax * blueMax)
})

console.log(result)