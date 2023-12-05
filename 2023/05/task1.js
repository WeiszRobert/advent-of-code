const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n\r\n')

const re = /\d+/g

const seeds = input[0].match(re).map(e => parseInt(e))
let result = Number.MAX_SAFE_INTEGER

seeds.forEach(seed => {
    let calcseed = seed

    input.slice(1, input.length).forEach(e => {
        let line = e.split('\r\n')
        for (let i = 1; i < line.length; i++) {
            let nums = line[i].match(re).map(e => parseInt(e))
            let dest = nums[0]
            let src = nums[1]
            let range = nums[2]
    
            if (calcseed >= src && calcseed < src + range) {
                calcseed += (dest - src)
                break;
            }
    
        }
    })
    
    if (calcseed < result) {
        result = calcseed
    }
})

console.log(result)