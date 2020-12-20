function solve(input, part) {
    const parsedInput = input.map(line => {
        const lineArr = line.split('')
        return [lineArr.slice(0, 7), lineArr.slice(7)]
    })
    const findSeat = (array, end = 127, start = 0, index = 0) => {
        let midpoint = (start + end) / 2
        if (array[index] === 'F' || array[index] === 'L') {
            midpoint = Math.floor(midpoint)
            if (array.length === index + 1) return midpoint
            return findSeat(array, midpoint, start, index + 1)
        } else if (array[index] === 'B' || array[index] === 'R') {
            midpoint = Math.ceil(midpoint)
            if (array.length === index + 1) return midpoint
            return findSeat(array, end, midpoint, index + 1)
        }
    }
    const calcId = array => findSeat(array[0]) * 8 + findSeat(array[1], 7)
    if (part === 1) {
        return parsedInput.reduce((highest, line) => {
            const seatId = calcId(line)
            return seatId > highest ? seatId : highest
        }, -1)
    } else {
        const seatIds = parsedInput.reduce((array, line) => {
            const seatId = calcId(line)
            return array.indexOf(seatId) === -1 ? [...array, seatId] : array
        }, []).sort()
        return 1 + seatIds.find((id, index) => seatIds[index + 1] === id + 2)
    }
}

const expected = part => part === 1 ? 913 : 717

module.exports = { solve, expected }
