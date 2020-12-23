function solve(input, part) {
    const startTime = Number(input[0])
    input = input[1].split(',')
    if (part === 1) {
        input = input.map(s => Number(s)).filter(s => !isNaN(s))
        let time = startTime
        while (true) {
            const bus = input.find(b => time % b === 0)
            if (bus != null) {
                return bus * (time - startTime)
            }
            time++
        }
    } else {
        input = input.map((s, index) => s === 'x' ? '' : [Number(s), index])
            .filter(s => s.length > 0)
        let multiple = input[0][0]
        let base = input[0][0]
        for (let index = 1; index < input.length; index++) {
            let i = 0
            while (true) {
                const increment = input[index][1]
                const testAns = (base + multiple * i + increment)
                if (testAns % input[index][0] === 0) {
                    multiple *= input[index][0]
                    base = testAns - increment
                    break
                }
                i++
            }
        }
        return base
    }
}

const expected = part => part === 1 ? 5946 : 645338524823718

module.exports = { solve, expected }
