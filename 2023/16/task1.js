const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

let visited = []
for(let i = 0; i < input.length; i++) {
    visited[i] = []
    for(let j = 0; j < input[0].length; j++) {
        visited[i][j] = []
    }
}

let tick = 0
let beams = []
beams.push({ x: 0, y: -1, direction: 'right' })

while (beams.length > 0) {
    tick++
    let newBeams = []
    let beamToRemove = []
    for (let i = 0; i < beams.length; i++) {
        let beam = beams[i]
        let x = beam.x
        let y = beam.y
        let direction = beam.direction

        switch (direction) {
            case 'right':
                y++
                break;
            case 'left':
                y--
                break;
            case 'up':
                x--
                break;
            case 'down':
                x++
                break;
        }

        if (tick > 1 && visited[beam.x][beam.y].includes(direction)) {
            beamToRemove.push(i)
            continue
        } else if (tick > 1) {
            visited[beam.x][beam.y].push(direction)
        }

        if (x < 0 || x >= input.length || (tick > 1 && y < 0) || y >= input[0].length) {
            beamToRemove.push(i)
            continue
        }

        if (input[x][y] === '.') {
            beams[i] = { x, y, direction }
        } else if (input[x][y] === '/') {
            switch (direction) {
                case 'right':
                    direction = 'up'
                    break;
                case 'left':
                    direction = 'down'
                    break;
                case 'up':
                    direction = 'right'
                    break;
                case 'down':
                    direction = 'left'
                    break;
            }
            beams[i] = { x, y, direction }
        } else if (input[x][y] === '\\') {
            switch (direction) {
                case 'right':
                    direction = 'down'
                    break;
                case 'left':
                    direction = 'up'
                    break;
                case 'up':
                    direction = 'left'
                    break;
                case 'down':
                    direction = 'right'
                    break;
            }
            beams[i] = { x, y, direction }
        } else if (input[x][y] === '|') {
            if (direction === 'left' || direction === 'right') {
                newBeams.push({ x, y, direction: 'up' })
                newBeams.push({ x, y, direction: 'down' })
                beamToRemove.push(i)
            } else {
                beams[i] = { x, y, direction }
            }
        } else if (input[x][y] === '-') {
            if (direction === 'up' || direction === 'down') {
                newBeams.push({ x, y, direction: 'left' })
                newBeams.push({ x, y, direction: 'right' })
                beamToRemove.push(i)
            } else {
                beams[i] = { x, y, direction }
            }
        }

    }
    beams = beams.filter((_, index) => !beamToRemove.includes(index))
    beams = beams.concat(newBeams)
}

let count = 0
for(let i = 0; i < input.length; i++) {
    for(let j = 0; j < input[0].length; j++) {
        if (visited[i][j].length >= 1) {
            count++
        }
    }
}

console.log(count)