const path = require('path');
const fs = require('fs');

let score = 0;
let input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n');
/*
console.log(input.length);
console.log("a", "a".charCodeAt(0));
console.log("Z", "A".charCodeAt(0));
*/
for(let i = 0; i < input.length; i += 3)
{
    let data = [Array.from(input[i]), Array.from(input[i+1]), Array.from(input[i+2])];
    result = data.reduce((a, b) => a.filter(c => b.includes(c)))[0];
    if (result.charCodeAt(0) >= 97 && result.charCodeAt(0) <= 122){
        score += result.charCodeAt(0)-96;
    } else {
        score += result.charCodeAt(0)-38;
    } 
}

console.log(score);
