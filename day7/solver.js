function solve(input, part) {
    let parsedInput = {}
    input.forEach(line => {
        const splitContain = line.split(' contain ')
        parsedInput[splitContain[0]] = splitContain[1].slice(0, -1).split(', ').map(part => {
            const num = part.slice(0, 1)
            if (num === 'n') {
                return part
            } else if (part[part.length - 1] === 's') {
                return [Number(num), part.slice(2)]
            } else {
                return [Number(num), part.slice(2).concat('s')]
            }
        })
    })
    if (part === 1) {
        let totalBags = []
        const outsideBags = possibleBags => {
            const validBags = Object.keys(parsedInput).reduce((bags, currBag) =>
                parsedInput[currBag].find(incBags =>
                    possibleBags.find(req => incBags[1] === req)
                ) ? [...bags, currBag] : bags
            , [])
            if (validBags.length > 0) {
                totalBags = totalBags.concat(validBags)
                outsideBags(validBags)
            }
        }
        outsideBags(['shiny gold bags'])
        return ([...new Set(totalBags)].length)
    } else {
        const insideBags = item =>
            parsedInput[item].reduce((sum, bag) =>
                bag !== 'no other bags' ? sum + bag[0] + bag[0] * insideBags(bag[1]) : sum + 0
            , 0)
        return insideBags('shiny gold bags')
    }
}

const expected = part => part === 1 ? 169 : 82372

module.exports = { solve, expected }
