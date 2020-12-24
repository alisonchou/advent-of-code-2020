const UINT64 = require('cuint').UINT64

function solve(input, part) {
    if (part === 1) {
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
        input = input.map(line => {
            const splitEqual = line.split(' = ')
            if (splitEqual[0] !== 'mask') {
                splitEqual[0] = splitEqual[0].slice(splitEqual[0].indexOf('[') + 1, splitEqual[0].length - 1)
            } else {
                let invMask = []
                splitEqual[1].split('').forEach(s => {
                    if (s === 'X') {
                        invMask = invMask.map(mask => mask + '0').concat(invMask.map(mask => mask + '1'))
                    } else if (s === '0') {
                        invMask = invMask.map(mask => mask + 'x')
                    } else if (s.length > 0) {
                        invMask = invMask.map(mask => mask + s)
                    }
                })
                splitEqual[1] = invMask.map(s => ['mask', s.replace(/x/g, '0'),
                    s.replace(/x/g, '1')])
            }
            return splitEqual
        })
        let memories = {}
        let mask
        input.forEach(line => {
            if (line[0] === 'mask') {
                mask = line[1]
            } else {
                mask.forEach(invMask => {
                    let res = UINT64(invMask[1], 2).or(UINT64(line[0]))
                    res = UINT64(invMask[2], 2).and(res)
                    memories[res] = line[1]
                })
            }
        })
        return Object.values(memories).reduce((sum, val) => sum.add(UINT64(val)), UINT64(0)).toString()
    }
}

const expected = part => part === 1 ? '14862056079561' : '3296185383161'

module.exports = { solve, expected }
