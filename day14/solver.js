const UINT64 = require('cuint').UINT64

function solve(input, part) {
    input = input.map(line => {
        const splitEqual = line.split(' = ')
        if (splitEqual[0] !== 'mask') {
            splitEqual[0] = splitEqual[0].slice(splitEqual[0].indexOf('[') + 1, splitEqual[0].length - 1)
        } else {
            return ['mask', splitEqual[1].replace(/X/g, '0'),
                splitEqual[1].replace(/X/g, '1')]
        }
        return splitEqual
    })
    console.log(input)
    if (part === 1) {
        let memories = {}
        let mask
        input.forEach(line => {
            if (line[0] === 'mask') {
                mask = [line[1], line[2]]
            } else {
                let res = UINT64(mask[0], 2).or(UINT64(line[1]))
                res = UINT64(mask[1], 2).and(res)
                memories[line[0]] = res
            }
        })
        return Object.values(memories).reduce((sum, val) => sum.add(val), UINT64(0)).toString()
    } else {
    }
}

const expected = part => part === 1 ? '14862056079561' : -1

module.exports = { solve, expected }
