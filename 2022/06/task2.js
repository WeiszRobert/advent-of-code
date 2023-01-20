const path = require('path');
const fs = require('fs');

let input = fs
.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
.toString()
.trim()

//console.log(input.length);

for (let i = 14; i < input.length; i++) {
    const substring = input.substring(i-14, i);
    const set = new Set(substring);
    if (set.size === 14) {
        //console.log(substring, i);
        console.log(i);
        return;
    }
}