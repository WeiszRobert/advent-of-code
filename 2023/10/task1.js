const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

const tiles = Array.from(input).map((row) => row.split(''))
const scores = new Array(tiles.length).fill(0).map(() => new Array(tiles[0].length).fill(0))

function getStartLocation() {
    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[0].length; j++) {
            if (tiles[i][j] === 'S') {
                return [i, j]
            }
        }
    }
}

const startLocation = getStartLocation()

function getAbove(x, y) {
    if (x === 0) return false

    let above = tiles[x - 1][y]
    return (above === '|' || above === '7' || above === 'F') ? [x - 1, y] : false
}

function getBelow(x, y) {
    if (x === tiles.length - 1) return false

    let below = tiles[x + 1][y]
    return (below === '|' || below === 'L' || below === 'J') ? [x + 1, y] : false
}

function getLeft(x, y) {
    if (y === 0) return false

    let left = tiles[x][y - 1]
    return (left === '-' || left === 'L' || left === 'F') ? [x, y - 1] : false
}

function getRight(x, y) {
    if (y === tiles[0].length - 1) return false

    let right = tiles[x][y + 1]
    return (right === '-' || right === 'J' || right === '7') ? [x, y + 1] : false
}

let currentLocation1 = undefined
let currentLocation2 = undefined
let above = getAbove(startLocation[0], startLocation[1])
if (above) {
    if (!currentLocation1) {
        currentLocation1 = above
    } else {
        currentLocation2 = above
    }
    scores[above[0]][above[1]]++
}
let below = getBelow(startLocation[0], startLocation[1])
if (below) {
    if (!currentLocation1) {
        currentLocation1 = below
    } else {
        currentLocation2 = below
    }
    scores[below[0]][below[1]]++
}
let left = getLeft(startLocation[0], startLocation[1])
if (left) {
    if (!currentLocation1) {
        currentLocation1 = left
    } else {
        currentLocation2 = left
    }
    scores[left[0]][left[1]]++
}
let right = getRight(startLocation[0], startLocation[1])
if (right) {
    if (!currentLocation1) {
        currentLocation1 = right
    } else {
        currentLocation2 = right
    }
    scores[right[0]][right[1]]++
}

scores[startLocation[0]][startLocation[1]] = false

let counter1 = 2
let counter2 = 2

function doStuffWithLocation(loc, counter) {
    if (tiles[loc[0]][loc[1]] === '|') {
        let above = getAbove(loc[0], loc[1])
        let below = getBelow(loc[0], loc[1])
        if (above) {
            if (scores[above[0]][above[1]] === 0) {
                scores[above[0]][above[1]] = counter
                counter++
                loc = above
            }
        }
        if (below) {
            if (scores[below[0]][below[1]] === 0) {
                scores[below[0]][below[1]] = counter
                counter++
                loc = below
            }
        }
    } else if (tiles[loc[0]][loc[1]] === '-') {
        let left = getLeft(loc[0], loc[1])
        let right = getRight(loc[0], loc[1])
        if (left) {
            if (scores[left[0]][left[1]] === 0) {
                scores[left[0]][left[1]] = counter
                counter++
                loc = left
            }
        }
        if (right) {
            if (scores[right[0]][right[1]] === 0) {
                scores[right[0]][right[1]] = counter
                counter++
                loc = right
            }
        }
    } else if (tiles[loc[0]][loc[1]] === 'L') {
        let above = getAbove(loc[0], loc[1])
        let right = getRight(loc[0], loc[1])
        if (above) {
            if (scores[above[0]][above[1]] === 0) {
                scores[above[0]][above[1]] = counter
                counter++
                loc = above
            }
        }
        if (right) {
            if (scores[right[0]][right[1]] === 0) {
                scores[right[0]][right[1]] = counter
                counter++
                loc = right
            }
        }
    } else if (tiles[loc[0]][loc[1]] === 'J') {
        let above = getAbove(loc[0], loc[1])
        let left = getLeft(loc[0], loc[1])
        if (above) {
            if (scores[above[0]][above[1]] === 0) {
                scores[above[0]][above[1]] = counter
                counter++
                loc = above
            }
        }
        if (left) {
            if (scores[left[0]][left[1]] === 0) {
                scores[left[0]][left[1]] = counter
                counter++
                loc = left
            }
        }
    } else if (tiles[loc[0]][loc[1]] === '7') {
        let below = getBelow(loc[0], loc[1])
        let left = getLeft(loc[0], loc[1])
        if (below) {
            if (scores[below[0]][below[1]] === 0) {
                scores[below[0]][below[1]] = counter
                counter++
                loc = below
            }
        }
        if (left) {
            if (scores[left[0]][left[1]] === 0) {
                scores[left[0]][left[1]] = counter
                counter++
                loc = left
            }
        }
    } else if (tiles[loc[0]][loc[1]] === 'F') {
        let below = getBelow(loc[0], loc[1])
        let right = getRight(loc[0], loc[1])
        if (below) {
            if (scores[below[0]][below[1]] === 0) {
                scores[below[0]][below[1]] = counter
                counter++
                loc = below
            }
        }
        if (right) {
            if (scores[right[0]][right[1]] === 0) {
                scores[right[0]][right[1]] = counter
                counter++
                loc = right
            }
        }
    }
    return {loc, counter}
}


while (counter1 === counter2 || Math.abs(counter1 - counter2) > 1) {
    
    let temp1 = doStuffWithLocation(currentLocation1, counter1)
    currentLocation1 = temp1.loc
    counter1 = temp1.counter

    let temp2 = doStuffWithLocation(currentLocation2, counter2)
    currentLocation2 = temp2.loc
    counter2 = temp2.counter
}
console.log(counter1 < counter2 ? counter1 : counter2)