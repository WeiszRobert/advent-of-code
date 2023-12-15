const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split(',')

function hashString(s) {
    let h = 0
    for(let i = 0; i < s.length; i++) {
        h += s.charCodeAt(i)
        h *= 17
        h %= 256
    }
    return h
}

let boxes = Array(256).fill({})

for (let i = 0; i < input.length; i++) {
    if (input[i].includes('=')) {
        let label = input[i].split('=')[0]
        let value = input[i].split('=')[1]
        let hash = hashString(label)
        boxes[hash] = {...boxes[hash], [label]: value}
    } else {
        let label = input[i].split('-')[0]
        let hash = hashString(label)
        if (boxes[hash].hasOwnProperty(label)) {
            delete boxes[hash][label]
        }
    }
}

let result = 0
for (let i = 0; i < boxes.length; i++) {
    let box = boxes[i]
    let keys = Object.keys(box)
    let sum = 0
    for (let j = 0; j < keys.length; j++) {
        sum += (i + 1) * (j + 1) * parseInt(box[keys[j]])
    }
    result += sum
}
console.log(result)