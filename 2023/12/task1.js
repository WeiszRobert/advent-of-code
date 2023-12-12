const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

const re = /\#+/g

function generateCombinations(string, combinations) {
    let index = string.indexOf('?')
    if (index !== -1) {
        generateCombinations(string.substring(0, index) + '.' + string.substring(index + 1), combinations)
        generateCombinations(string.substring(0, index) + '#' + string.substring(index + 1), combinations)
    } else {
        combinations.push(string)
    }
}

function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

let sum = 0
input.forEach((row, index) => {
    console.log('currently at', index, '\tout of', input.length)

    let nums = row.split(' ')[1].split(',').map(e => parseInt(e))
    let string = row.split(' ')[0]
    
    let questionMarkIndices = [];
    for (let i = 0; i < string.length; i++) {
        if (string[i] === '?') {
            questionMarkIndices.push(i)
        }
    }
    
    let combinations = [];
    generateCombinations(string, combinations)
    
    combinations.forEach(combination => {
        let matches = combination.match(re)
        if (matches) {
            let lengthOfGroups = matches.map(e => e.length)
            if (arraysEqual(lengthOfGroups, nums)) {
                sum++
            }   
        }
    })
    
})
console.log(sum)