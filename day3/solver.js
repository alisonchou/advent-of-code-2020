function solve(input, part) {
    const parsedInput = input.map(line => line.split(''))
    const traverser = (right, down = 1) => {
        let index = -right
        const traverseArray = arr => arr.map(line => {
            index += right
            if (index >= arr[0].length) {
                index -= arr[0].length
            }
            return line[index]
        }).reduce((sum, curr) => curr === '#' ? sum + 1 : sum, 0)
        if (down > 1) {
            return traverseArray(parsedInput.filter((row, index) => (index + 1) % down !== 0))
        } else {
            return traverseArray(parsedInput)
        }
    }
    if (part === 1) {
        return traverser(3)
    } else {
        return traverser(1) * traverser(3) * traverser(5) * traverser(7) * traverser(1, 2)
    }
}

const expected = part => part === 1 ? 209 : 1574890240

module.exports = { solve, expected }
