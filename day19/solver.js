function solve(input, part) {
    input = input.map(section => section.split('\n').filter(s => s.length > 0))
    input[0] = input[0].reduce((rules, line) => {
        const splitColon = line.split(': ')
        if (splitColon[1] === '"a"' || splitColon[1] === '"b"') {
            splitColon[1] = splitColon[1].slice(1, 2)
        } else {
            splitColon[1] = splitColon[1].split(' | ').map(s => s.split(' '))
        }
        rules[splitColon[0]] = splitColon[1]
        return rules
    }, {})
    if (part === 1) {
        const evalRule = rule => {
            if (typeof input[0][rule] === 'string') {
                return [input[0][rule]]
            } else {
                return input[0][rule].reduce((arr, exp) => {
                    let res = []
                    evalRule(exp[0]).forEach(s1 => {
                        if (exp.length > 1) {
                            evalRule(exp[1]).forEach(s2 => {
                                res.push(s1 + s2)
                            })
                        } else {
                            res.push(s1)
                        }
                    })
                    return arr.concat(res)
                }, [])
            }
        }
        const matches = evalRule('0')
        return input[1].reduce((sum, line) => matches.indexOf(line) !== -1 ? sum + 1 : sum, 0)
    } else {
    }
}

const expected = part => part === 1 ? 107 : -1

module.exports = { solve, expected }
