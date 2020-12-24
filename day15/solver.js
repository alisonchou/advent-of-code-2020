const MegaHash = require('megahash')

function solve(input, part) {
    input = input[0].split(',')
    const hashNumSeq = len => {
        let prevNum
        let prevNums = new MegaHash()
        for (let i = 0; i < len; i++) {
            if (input[i] != null) {
                prevNum = input[i]
                prevNums.set(prevNum, [-1, i])
            } else {
                const lastLastOcc = prevNums.get(prevNum)[0]
                if (lastLastOcc === -1) {
                    prevNum = 0
                    prevNums.set(prevNum, [prevNums.get(prevNum)[1], i])
                } else {
                    prevNum = prevNums.get(prevNum)[1] - lastLastOcc
                    if (prevNums.has(prevNum)) {
                        prevNums.set(prevNum, [prevNums.get(prevNum)[1], i])
                    } else {
                        prevNums.set(prevNum, [-1, i])
                    }
                }
            }
        }
        return prevNum
    }
    if (part === 1) {
        return hashNumSeq(2020)
    } else {
        return hashNumSeq(30000000)
    }
}

const expected = part => part === 1 ? 249 : 41687

module.exports = { solve, expected }
