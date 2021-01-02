const MegaHash = require('megahash')

function solve(input, part) {
    input = input[0].split('').map(s => Number(s))
    const playGame = (cards, max, moves) => { // hashtable method
        let currCard = input[0], pickedUp
        for (let i = 0; i < moves; i++) {
            const next = cards.get(currCard)[1],
                next2 = cards.get(next)[1],
                next3 = cards.get(next2)[1],
                afterPU = cards.get(next3)[1]
            pickedUp = [next, next2, next3]
            let found = -1, dest = currCard - 1
            while (found === -1) {
                if (cards.has(dest)) {
                    found = dest
                } else {
                    if (dest < 1) {
                        found = max
                        dest = max
                    }
                }
                if (pickedUp.indexOf(found) !== -1) {
                    found = -1
                }
                dest--
            }
            const afterFound = cards.get(found)[1]
            cards.set(next, [found, next2])
            cards.set(next3, [next2, afterFound])
            cards.set(found, [cards.get(found)[0], next])
            cards.set(afterFound, [next3, cards.get(afterFound)[1]])
            cards.set(currCard, [cards.get(currCard)[0], afterPU])
            cards.set(afterPU, [currCard, cards.get(afterPU)[1]])
            currCard = cards.get(currCard)[1]
        }
        return cards
    }
    const playGameArr = (cards, max, moves) => { // array method
        let currCard = cards[0], pickedUp
        for (let i = 0; i < moves; i++) {
            pickedUp = cards.splice((cards.indexOf(currCard) + 1) % cards.length, 1)
            pickedUp.push(...cards.splice((cards.indexOf(currCard) + 1) % cards.length, 1),
                ...cards.splice((cards.indexOf(currCard) + 1) % cards.length, 1))
            let found = -1, dest = currCard - 1
            while (found === -1) {
                const index = cards.indexOf(dest)
                if (index !== -1) {
                    found = index
                } else {
                    dest--
                    if (dest < 1) {
                        found = cards.indexOf(max)
                    }
                }
            }
            cards.splice(found + 1, 0, ...pickedUp)
            currCard = cards[(cards.indexOf(currCard) + 1) % cards.length]
        }
        return cards
    }
    if (part === 1) {
        let cards = new MegaHash()
        for (let i = 0; i < input.length; i++) {
            cards.set(input[i], [input[i - 1] || input[input.length - 1], input[i + 1] || input[0]])
        }
        cards = playGame(cards, input.length, 100)
        const arrRes = playGameArr(input, input.length, 100)
        let str = '', card = 1
        const index1 = arrRes.indexOf(1)
        for (let i = 1; i < arrRes.length; i++) {
            card = cards.get(card)[1]
            if (card === arrRes[(i + index1) % arrRes.length]) { // both methods work!
                str += card
            }
        }
        return str
    } else {
        let cards = new MegaHash()
        for (let i = 1; i <= 1000000; i++) {
            if (input[i - 1] != null) {
                cards.set(input[i - 1], [input[i - 2] || 1000000, input[i] || i + 1])
            } else {
                cards.set(i, [i === input.length ?
                    input[input.length - 1] : i - 1, i === 1000000 ? input[0] : i + 1])
            }
        }
        cards = playGame(cards, 1000000, 10000000)
        const cardAfter1 = cards.get(1)[1]
        return cardAfter1 * cards.get(cardAfter1)[1]
    }
}

const expected = part => part === 1 ? '97632548' : 412990492266

module.exports = { solve, expected }
