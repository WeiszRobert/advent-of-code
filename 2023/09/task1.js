const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

const sequences = input.map((line) => line.split(' ').map((num) => parseInt(num)))

function calc(sequence) {
    let arr = []
    arr.push(sequence)
    let i = 0
    while (!arr[arr.length-1].every((num) => num === 0)){
        let newArr = []
        for (let j = 0; j < arr[i].length-1; j++){
            newArr.push(arr[i][j+1] - arr[i][j])
        }
        arr.push(newArr)
        i++
    }

    arr.reverse()

    let newNum = 0
    for (let j = 0; j < arr.length-1; j++){
        newNum = arr[j][arr[j].length-1] + arr[j+1][arr[j+1].length-1]
        arr[j+1].push(newNum)
    }

    return newNum
}

console.log(sequences.map((sequence) => calc(sequence)).reduce((acc, curr) => acc + curr, 0))