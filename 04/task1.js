const path = require('path');
const fs = require('fs');

let input = fs
.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
.toString()
.trim()
.split('\r\n');

let score = 0;
input.forEach((line) => {
    let range = line.split(',').map((x) => {
        let a = parseInt(x.split('-')[0]);
        let b = parseInt(x.split('-')[1]);
        return {a, b};
    });
    //console.log(range);
    if (range[0].a <= range[1].a && range[0].b >= range[1].b) {
        score += 1;
    } else if (range[0].a >= range[1].a && range[0].b <= range[1].b) {
        score += 1;
    }
});

console.log(score);