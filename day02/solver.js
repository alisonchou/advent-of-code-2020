function solve(input, part) {
    return input
        .map(line => {
            const splitColon = line.split(': ')
            const splitLetters = splitColon[1].split('')
            const splitSpace = splitColon[0].split(' ')
            const splitHyphen = splitSpace[0].split('-').map(strNum => Number(strNum))
            return [[splitHyphen[0], splitHyphen[1]], splitSpace[1], splitLetters]
        })
        .reduce((total, line) => {
            if (part === 1) {
                const letters = line[2].filter(letter => letter === line[1])
                return letters.length >= line[0][0] && letters.length <= line[0][1] ? total + 1 : total
            } else {
                const firstIndex = line[2][line[0][0] - 1] === line[1]
                const secondIndex = line[2][line[0][1] - 1] === line[1]
                return firstIndex && !secondIndex || !firstIndex && secondIndex ? total + 1 : total
            }
        }, 0)
}

const expected = part => part === 1 ? 410 : 694

module.exports = { solve, expected }
