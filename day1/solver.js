function solve(input, part) {
    const nums = input.map(line => Number(line))
    const numInput = nums.sort((a, b) => a - b);
    const binarySearch = (array, target, start = 0, end = array.length-1) => {
        const midpoint = ~~(start + (end - start) / 2)
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
    if (part === 1) {
        return numInput.filter(line => binarySearch(numInput, 2020-line))
            .reduce((prev, next) => prev * next * (2020 - next), 1)
    } else {
        return numInput.filter(line => {
            return numInput.filter(secondLine => {
                const diff = 2020 - line - secondLine
                return diff > 0 && binarySearch(numInput, diff)
            }).length > 0
        }).reduce((prev, next) => prev * next, 1)
    }
}

const expected = (part) => part === 1 ? 651651 : 214486272

module.exports = { solve, expected }
