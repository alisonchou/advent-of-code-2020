function solve(input, part) {
    input = input.map(s => Number(s)).sort((a, b) => a - b)
    if (part === 1) {
        const differences = input.reduce((arr, next, index) => {
            if (index === 0) {
                return input[index] - 0 === 1 ? [arr[0] + 1, arr[1]] : [arr[0], arr[1] + 1]
            } else if (index > 0) {
                return input[index] - input[index - 1] === 1 ? [arr[0] + 1, arr[1]] : [arr[0], arr[1] + 1]
            } else {
                return arr
            }
        }, [0, 1])
        return differences[0] * differences[1]
    } else {
        let array = new Array(input[input.length - 1]).fill(0)
        array[0] = 1
        input.forEach(next => {
            let sum = 0
            if (next > 1) {
                sum += array[next - 2]
            }
            if (next > 2) {
                sum += array[next - 3]
            }
            array[next] = array[next - 1] + sum
        })
        return array[array.length - 1]
    }
}

const expected = part => part === 1 ? 2574 : 2644613988352

module.exports = { solve, expected }
