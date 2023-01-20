const path = require('path');
const fs = require('fs');

let score = 0;
let input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n');
/*
console.log(input);
console.log("a", "a".charCodeAt(0));
console.log("Z", "A".charCodeAt(0));
*/
input.forEach((line) => {
    let length = line.length;
    let part1 = line.substring(0, length / 2);
    let part2 = line.substring(length / 2, length);
    //console.log(part1, part2);

    let isEnd = true // I legitemately don't know how to exit a foreach in a nicer way
    Array.from(part1).forEach((char) => {
        if (!isEnd) { return; }
        if (part2.includes(char)) {
            if (char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122){
                isEnd = false;
                score += char.charCodeAt(0)-96;
            } else {
                isEnd = false;
                score += char.charCodeAt(0)-38;
            }   
        }
    });
});

console.log(score);
