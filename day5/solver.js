function solve(input, part) {
    const parsedInput = input.map(line => {
        const lineArr = line.split('')
        return [ lineArr.slice(0, 6), lineArr.slice(6) ]
    })
    console.log(parsedInput)
    if (part === 1) {
        const midFinder = (array, start = 0, end = 127, index = 0) => {
            const midpoint = ~~(start + (end - start) / 2)
            if (array[index] === 'F' || array[index] === 'L') {
                if (array.length === index + 1) return midpoint
                return midFinder(array, start, midpoint, index + 1)
            } else if (array[index] === 'B' || array[index] === 'R') {
                if (array.length === index + 1) return midpoint + 1
                return midFinder(array, midpoint + 1, end, index + 1)
            }
        }
        return parsedInput.reduce((highest, line) => {
            const seatId = midFinder(line[0]) * 8 + midFinder(line[1], 0, 7)
            return seatId > highest ? seatId : highest
        }, -1)
    } else {

    }
}

const expected = part => part === 1 ? 913 : -1

module.exports = { solve, expected }
