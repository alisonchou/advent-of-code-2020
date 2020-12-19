const fs = require('fs');

const day = Number(process.argv[2])
const path = `./day${day}`
const text = fs.readFileSync(path + '/input.txt')
    .toString()
    .split('\n')
    .filter(s => s.length > 0)

const solver = require(path + '/solver')
for (let part of [1,2]) {
    const answer = solver.solve(text, part)
    const expected = solver.expected(part)
    if (answer === expected) {
        console.log(`Correct: ${day} part ${part}: ${answer}`)
    } else {
        console.log(`Incorrect: ${day} part ${part}: ${answer} - expected ${expected}`)
    }
}
