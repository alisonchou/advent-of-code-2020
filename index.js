const fs = require('fs');

const inputs = process.argv.slice(2)
const day = Number(inputs[0])

const path = `./day${day}`
const fileText = fs.readFileSync(path + '/input.txt').toString().replace(/\r/g, '')
const text = () => {
    if ([4, 6, 16, 19, 20].indexOf(day) !== -1) {
        return fileText
            .split('\n\n')
            .filter(s => s.length > 0)
    } else {
        return fileText
            .split('\n')
            .filter(s => s.length > 0)
    }
}

const solver = require(path + '/solver')
const runPart = part => {
    const answer = solver.solve(text(), part)
    const expected = solver.expected(part)
    if (answer === expected) {
        console.log(`Correct: ${day} part ${part}: ${answer}`)
    } else {
        console.log(`Incorrect: ${day} part ${part}: ${answer} - expected ${expected}`)
    }
}

if (inputs.length === 1) {
    runPart(1)
    runPart(2)
} else {
    runPart(Number(inputs[1]))
}
