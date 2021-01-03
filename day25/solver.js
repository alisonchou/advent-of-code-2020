function solve(input) {
    input = input.map(s => Number(s))
    let cardLoops = 0, key = 1
    while (key !== input[0]) {
        key *= 7
        key %= 20201227
        cardLoops++
    }
    let encKey = 1
    for (let i = 0; i < cardLoops; i++) {
        encKey *= input[1]
        encKey %= 20201227
    }
    return encKey
}

const expected = () => 12285001

module.exports = { solve, expected }
