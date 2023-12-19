const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n\r\n')

let allRules = {}
input[0].split('\r\n').forEach(workflow => {
    let line = workflow.split('{')
    let name = line[0]
    let rules = line[1].slice(0, -1).split(',')
    
    let list = []
    for (let i = 0; i < rules.length -1; i++) {
        let asd = rules[i].slice(2).split(':')
        let newObject = {
            category: rules[i][0],
            greaterThan: rules[i][1] === '>',
            value: parseInt(asd[0]),
            destination: asd[1]
        }
        list.push(newObject)
    }
    list.push({destination: rules[rules.length - 1]})

    allRules[name] = list
})

let parts = []
let numbersRegex = /\d+/g
input[1].split('\r\n').forEach(part => {
    let matches = part.match(numbersRegex).map(e => parseInt(e))
    parts.push({x: matches[0], m: matches[1], a: matches[2], s: matches[3]})
})

function calculateScore(part) {
    let end = false
    let currentPoint = 'in'
    while (!end) {
        let partToCheck = allRules[currentPoint]
        let found = false
        partToCheck.forEach(rule => {
            if (!found) {
                if (rule.category) {
                    if (rule.greaterThan) {
                        if (part[rule.category] > rule.value) {
                            currentPoint = rule.destination
                            found = true
                        }
                    } else {
                        if (part[rule.category] < rule.value) {
                            currentPoint = rule.destination
                            found = true
                        }
                    }
                } else {
                    currentPoint = rule.destination
                    found = true
                }
            }
        })
        if (currentPoint === 'A' || currentPoint === 'R') {
            end = true
        }
    }

    return (currentPoint === 'A') ? part.x + part.m + part.a + part.s : 0
}

let sum = parts.reduce((acc, part) => acc + calculateScore(part), 0);
console.log(sum)