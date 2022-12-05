const path = require('path');
const fs = require('fs');

let input = fs
.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
.toString()
.split('\r\n');

const numOfCrates = parseInt((input[0].length+1)/4);
const crates = [];
for (let i = 0; i < numOfCrates; i++) {
    crates.push([]);
}

for (let i = 0; i < input.length; i++) {
    const line = Array.from(input[i]);

    // if we got the crates current states, there is an empty line,
    // and that's where we reverse the crates
    if ((!Array.isArray(input[i]) && !input[i].length))
    {
        crates.forEach(element => {element.reverse()});
    }

    // check if the line starts with m,
    // if it does, we have to move packages from one crate to another
    const firstLetter = line[0];
    if (firstLetter === "m") {
        const words = input[i].split(" ");
        const howMany = parseInt(words[1]);
        const from = parseInt(words[3])-1;
        const to = parseInt(words[5])-1;

        for (let j = 0; j < howMany; j++) {
            crates[to].push(crates[from].pop());
        }

    // check if the line starts with a space or a [, if it does,
    // we have to add crates
    } else if (firstLetter === " " || firstLetter === "[") {
        for (let j = 0; j < line.length; j++) {
            // iterate through the line and check if there is a package
            const element = line[j];
            if (element === "[") {
                crates[Math.floor(parseInt(j+1)/4)].push(line[j+1]);
            }
        }
    }
}
//console.log(crates);

let result = "";
crates.forEach(element => {
    result += element[element.length-1];
});
console.log(result);