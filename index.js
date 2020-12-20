const fs = require('fs');

const inputs = process.argv.slice(2)
const day = Number(inputs[0])

const path = `./day${day}`
const fileText = fs.readFileSync(path + '/input.txt').toString()
const text = () => {
    if (day === 4) {
        return fileText
            .split('\n\n')
            .filter(s => s.length > 0)
            .map(item => {
                let obj = {}
                item.split(/\n| /).filter(s => s !== '')
                    .map(field => {
                        const colonIndex = field.indexOf(':')
                        obj[field.substring(0, colonIndex)] = field.substring(colonIndex+1)
                    })
                return obj
            })
    } else {
        return fileText
            .split('\n')
            .map(s => s.replace(/\r$/, ''))
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
    for (let part of [1, 2]) {
        runPart(part)
    }
} else {
    runPart(Number(inputs[1]))
}
