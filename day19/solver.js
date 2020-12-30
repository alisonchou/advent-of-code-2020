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
    if (part === 1) {
        const zeroMatches = evalRule('0')
        return input[1].reduce((sum, line) => zeroMatches.indexOf(line) !== -1 ? sum + 1 : sum, 0)
    } else {
        const matches42 = evalRule('42')
        const matches31 = evalRule('31')
        const increment = matches31[0].length
        return input[1].reduce((sum, match) => {
            let on31 = false
            let num42 = 0, num31 = 0
            for (let i = 0; i < match.length; i += increment) {
                const part = match.slice(i, i + increment)
                if (!on31) {
                    if (matches42.indexOf(part) !== -1) {
                        num42++
                    } else {
                        on31 = true
                    }
                }
                if (on31) {
                    if (matches31.indexOf(part) !== -1) {
                        num31++
                    } else {
                        return sum
                    }
                }
            }
            return num31 > 0 && num42 > num31 ? sum + 1 : sum
        }, 0)
    }
}

const expected = part => part === 1 ? 107 : 321

module.exports = { solve, expected }
