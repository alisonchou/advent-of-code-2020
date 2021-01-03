function solve(input, part) {
    if (part === 1) {
        return input.map(group => group.replace(/\n/g, ''))
            .reduce((count, answer) => count + [...new Set(answer)].length, 0)
    } else {
        return input.reduce((sum, group) => {
            const groupArr = group.split(/\n/).filter(s => s.length > 0)
            const firstAns = [...new Set(groupArr[0])]
            if (groupArr.length > 1) {
                return sum +
                    firstAns.reduce((groupSum, letter) =>
                        groupArr.slice(1)
                            .map(s => s.split(''))
                            .reduce((inAll, answer) =>
                                inAll && answer.indexOf(letter) !== -1, true)
                            ? groupSum + 1 : groupSum
                        , 0)
            } else {
                return sum + firstAns.length
            }
        }, 0)
    }
}

const expected = part => part === 1 ? 6437 : 3229

module.exports = { solve, expected }
