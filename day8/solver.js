function solve(input, part) {
    input = input.map(s => {
        const splitSpace = s.split(' ')
        return [splitSpace[0], Number(splitSpace[1])]
    })
    const runCmd = (index, array = input, visited = [], accumulator = 0) => {
        if (visited.indexOf(index) !== -1) {
            return [false, accumulator]
        }
        if (array.length <= index) {
            return [true, accumulator]
        }
        const instruction = array[index][0]
        const value = array[index][1]
        if (instruction === 'jmp') {
            return runCmd(index + value, array, [...visited, index], accumulator)
        } else {
            if (instruction === 'acc') {
                accumulator += value
            }
            return runCmd(index + 1, array, [...visited, index], accumulator)
        }
    }
    if (part === 1) {
        return runCmd(0)[1]
    } else {
        let count = 0
        while (true) {
            let occIndex = -1
            const newInput = input.map(s => [s[0].replace(/nop|jmp/g, match => {
                occIndex++
                if (occIndex === count) {
                    if (match === 'nop') {
                        return 'jmp'
                    } else if (match === 'jmp') {
                        return 'nop'
                    }
                } else {
                    return match
                }
            }), s[1]])
            const result = runCmd(0, newInput)
            if (result[0]) {
                return result[1]
            } else {
                count++
            }
        }
    }
}

const expected = part => part === 1 ? 1200 : 1023

module.exports = { solve, expected }
