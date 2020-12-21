function solve(input, part) {
    input = input.map(line => Number(line)).sort((a, b) => a - b)
    const binarySearch = (array, target, start = 0, end = array.length-1) => {
        const midpoint = ~~((start + end) / 2)
        const midpointVal = array[midpoint]
        if (midpointVal === target) {
            return true
        } else if (start >= end) {
            return false
        } else if (midpointVal > target) {
            return binarySearch(array, target, start, midpoint - 1)
        } else {
            return binarySearch(array, target, midpoint + 1, end)
        }
    }
    const multiplier = (product, next) => product * next
    return input
        .filter(line => {
            if (part === 1) {
                return binarySearch(input, 2020 - line)
            } else {
                return input.filter(secondLine => {
                    const diff = 2020 - line - secondLine
                    return diff > 0 && binarySearch(input, diff)
                }).length > 0
            }
        })
        .reduce(multiplier, 1)
}

const expected = part => part === 1 ? 651651 : 214486272

module.exports = { solve, expected }
