const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

let equations = []
input.forEach(line => {
    let [pointStr, directionStr] = line.split(' @ ')
    let [x, y, z] = pointStr.split(', ').map(e => parseInt(e))
    let [dx, dy, dz] = directionStr.split(', ').map(e => parseInt(e))
    let pointObj = { x, y, z }
    let directionObj = { dx, dy, dz }
    equations.push({ pointObj, directionObj })
});

function findIntersection(point1, direction1, point2, direction2) {
    let det = direction1.dx * direction2.dy - direction1.dy * direction2.dx

    if (det === 0) {
        return null
    }

    let t1 = ((point2.x - point1.x) * direction2.dy - (point2.y - point1.y) * direction2.dx) / det
    
    let intersectionX = point1.x + t1 * direction1.dx
    let intersectionY = point1.y + t1 * direction1.dy

    return { x: intersectionX, y: intersectionY }
}

function isInThePast(originalpoint, point, direction) {
    if ((direction.dx < 0 && point.x > originalpoint.x) || (direction.dx > 0 && point.x < originalpoint.x)) {
        return true
    } else if ((direction.dy < 0 && point.y > originalpoint.y) || (direction.dy > 0 && point.y < originalpoint.y)) {
        return true
    } else if ((direction.dz < 0 && point.z > originalpoint.z) || (direction.dz > 0 && point.z < originalpoint.z)) {
        return true
    }

    return false
}

const MIN = 200000000000000
const MAX = 400000000000000

function isInBounds(point) {
    return point.x >= MIN && point.x <= MAX && point.y >= MIN && point.y <= MAX
}

function isInThePastForBoth(eq1, eq2, point) {
    return isInThePast(eq1.pointObj, point, eq1.directionObj) || isInThePast(eq2.pointObj, point, eq2.directionObj)
}

let count = 0
for (let i = 0; i < equations.length; i++) {
    for (let j = i + 1; j < equations.length; j++) {
        const intersection = findIntersection(
            equations[i].pointObj,
            equations[i].directionObj,
            equations[j].pointObj,
            equations[j].directionObj
        )

        if (intersection && isInBounds(intersection) && !isInThePastForBoth(equations[i], equations[j], intersection))
        {
            count++
        }
    }
}
console.log(count)