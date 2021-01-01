function solve(input, part) {
    for (let i = 0; i < input.length; i++) {
        input[i] = input[i].slice(10).split('\n')
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j].length === 0) {
                input[i].splice(j)
            } else {
                input[i][j] = Number(input[i][j])
            }
        }
    }
    if (part === 1) {
        const combat = (player1, player2) => {
            while (player1.length > 0 && player2.length > 0) {
                if (player1[0] > player2[0]) {
                    player1.push(player1.shift(), player2.shift())
                } else {
                    player2.push(player2.shift(), player1.shift())
                }
            }
            if (player1.length === 0) {
                return player2
            }
            if (player2.length === 0) {
                return player1
            }
        }
        const cards = combat(input[0], input[1])
        let res = 0
        for (let i = cards.length; i > 0; i--) {
            res += i * cards[cards.length - i]
        }
        return res
    } else {
        const cardsEqual = (cardsA, cardsB) => {
            for (let i = 0; i < cardsA.length; i++) {
                if (cardsA[i] !== cardsB[i]) {
                    return false
                }
            }
            return true
        }
        const recCombat = (player1, player2) => {
            const playedCards = []
            while (player1.length > 0 && player2.length > 0) {
                for (let i = 0; i < playedCards.length; i++) {
                    if (cardsEqual(playedCards[i][0], player1) && cardsEqual(playedCards[i][1], player2)) {
                        return [1, player1]
                    }
                }
                playedCards.push([[...player1], [...player2]])
                const player1card = player1[0], player2card = player2[0]
                if (player1.length > player1card && player2.length > player2card) {
                    if (recCombat(player1.slice(1, 1 + player1card), player2.slice(1, 1 + player2card))[0] === 1) {
                        player1.push(player1.shift(), player2.shift())
                    } else {
                        player2.push(player2.shift(), player1.shift())
                    }
                } else {
                    if (player1card > player2card) {
                        player1.push(player1.shift(), player2.shift())
                    } else {
                        player2.push(player2.shift(), player1.shift())
                    }
                }
            }
            if (player1.length === 0) {
                return [2, player2]
            }
            if (player2.length === 0) {
                return [1, player1]
            }
        }
        const cards = recCombat(input[0], input[1])[1]
        let res = 0
        for (let i = cards.length; i > 0; i--) {
            res += i * cards[cards.length - i]
        }
        return res
    }
}

const expected = part => part === 1 ? 35370 : 36246

module.exports = { solve, expected }
