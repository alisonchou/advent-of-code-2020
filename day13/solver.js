function solve(input, part) {
    const startTime = Number(input[0])
    input = input[1].split(',').map(s => Number(s)).filter(s => !isNaN(s))
    console.log(input)
    if (part === 1) {
        let time = startTime
        while (true) {
            const bus = input.find(b => time % b === 0)
            if (bus != null) {
                return bus * (time - startTime)
            }
            time++
        }
    } else {
    }
}

const expected = part => part === 1 ? 5946 : -1

module.exports = { solve, expected }
