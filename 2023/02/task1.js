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

const redmax = 12
const greenmax = 13
const bluemax = 14

let idSum = 0

input.forEach(e => {
    let gamedata = e.split(':')
    let id = parseInt(gamedata[0].match(re)[0])

    let reds = gamedata[1].match(rered).map(e => parseInt(e.match(re))).every(e => e <= redmax)
    let greens = gamedata[1].match(regreen).map(e => parseInt(e.match(re))).every(e => e <= greenmax)
    let blues = gamedata[1].match(reblue).map(e => parseInt(e.match(re))).every(e => e <= bluemax)

    if (reds && greens && blues) {
        idSum += id
    }
})

console.log(idSum)