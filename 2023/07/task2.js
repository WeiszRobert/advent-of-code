const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\r\n')

const cards = input.map(e => {
    let values = e.split(' ')
    return {
        cards: values[0],
        bet: parseInt(values[1])
    }
})

const cardTypes = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']
const fiveOfAKind = [5]
const fourOfAKind = [1, 4]
const fullhouse = [2, 3]
const threeOfAKind = [1, 1, 3]
const twoPair = [1, 2, 2]
const pair = [1, 1, 1, 2]
const highCard = [1, 1, 1, 1, 1]

function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

function checkEachDigits(a, b) {
    for (let i = 0; i < 5; i++) {
        if (cardTypes.indexOf(a[i]) > cardTypes.indexOf(b[i])) {
            return -1
        } else if (cardTypes.indexOf(a[i]) < cardTypes.indexOf(b[i])) {
            return 1
        }
    }
}

function getCardValues(cards) {
    let result = []
    cards.split('').forEach(element => {
        if (!result[element]) {
            result[element] = 1
        } else {
            result[element]++
        }
    });

    let keys = Object.keys(result).find(e => e === 'J')
    if (keys) {
        let jokerCount = result[keys]
        
        let max = 0
        let maxKey = ''
        Object.keys(result).forEach(e => {
            if (result[e] > max && e !== 'J') {
                max = result[e]
                maxKey = e
            }
        })
        if (jokerCount === 5) {
            result['A'] = 5
            result['J'] = 0
        } else {
            result[maxKey] += jokerCount
            result['J'] -= jokerCount
        }
    }
    return Object.values(result).filter(e => e != 0).sort()
}

function checkCondition(aCards, bCards, condition, checkEachDigitsFunction) {
    let aCardsValues = getCardValues(aCards)
    let bCardsValues = getCardValues(bCards)

    if (condition(aCardsValues) && !condition(bCardsValues)) {
        return 1
    } else if (!condition(aCardsValues) && condition(bCardsValues)) {
        return -1
    } else if (condition(aCardsValues) && condition(bCardsValues)) {
        return checkEachDigitsFunction(aCards, bCards)
    }
}

const conditions = [
    (cardsValues) => arraysEqual(cardsValues, fiveOfAKind),
    (cardsValues) => arraysEqual(cardsValues, fourOfAKind),
    (cardsValues) => arraysEqual(cardsValues, fullhouse),
    (cardsValues) => arraysEqual(cardsValues, threeOfAKind),
    (cardsValues) => arraysEqual(cardsValues, twoPair),
    (cardsValues) => arraysEqual(cardsValues, pair),
    (cardsValues) => arraysEqual(cardsValues, highCard),
]

function compareFn(a, b) {
    for (let condition of conditions) {
        let result = checkCondition(a.cards, b.cards, condition, checkEachDigits);
        if (result) {
            return result
        }
    }
}

cards.sort(compareFn)

let sum = 0
for (let i = 0; i < cards.length; i++) {
    sum += cards[i].bet * (i + 1)
}

console.log(sum)