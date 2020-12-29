function solve(input, part) {
    input = input.map(line => line.replace(/ /g, '').split('').map(s => isNaN(Number(s)) ? s : Number(s)))
    let operator
    let total = 0
    if (part === 1) {
        const doMath = (a, b, op = operator) => {
            if (op === '*') {
                return a * b
            } else {
                return a + b
            }
        }
        input.forEach(line => {
            let lineTotal = 0
            operator = ''
            let i = 0
            let parenResults = []
            while (i < line.length) {
                if (typeof line[i] === 'number') {
                    if (parenResults.length === 0) {
                        lineTotal = doMath(lineTotal, line[i])
                    } else {
                        parenResults[parenResults.length - 1][0] = doMath(parenResults[parenResults.length - 1][0], line[i])
                    }
                } else if (line[i] === '(') {
                    const prevOp = line[i - 1]
                    if (prevOp === '+' || prevOp === '*') {
                        parenResults.push([0, prevOp])
                    } else {
                        parenResults.push([0, ''])
                    }
                    operator = '+'
                } else if (line[i] === ')') {
                    const popped = parenResults.pop()
                    if (parenResults.length === 0) {
                        lineTotal = doMath(lineTotal, popped[0], popped[1])
                    } else {
                        parenResults[parenResults.length - 1][0] = doMath(parenResults[parenResults.length - 1][0], popped[0], popped[1])
                    }
                } else {
                    operator = line[i]
                }
                i++
            }
            total += lineTotal
        })
    } else {
        input.forEach(line => {
            const multNext = () => {
                if (line[i + 2] === '*' || line[i + 1] === '*') {
                    return true
                } else if (line[i + 1] === '(') {
                    let count = 1
                    let index = i + 3
                    while (count !== 0 && index < line.length) {
                        if (line[index] === '(') {
                            count++
                        } else if (line[index] === ')') {
                            count--
                        }
                        index++
                    }
                    return line[index] === '*'
                }
                return false
            }
            const mather = (arr, curr, operator, inParen = false) => {
                if (operator === '') {
                    arr.push(curr)
                } else if ((!inParen && arr.length === 3) || (inParen && arr.length === 4)) {
                    if (operator === '*' && !multNext()) {
                        arr[0] = arr.pop()
                        arr[1] = curr
                    } else if (operator === '+') {
                        arr[1] = curr + arr.pop()
                    } else {
                        arr[0] = curr * arr.pop()
                    }
                } else {
                    if (operator === '*' && !multNext()) {
                        arr[0] = (arr[1] || 1) * (arr[0] || 1)
                        arr[1] = curr
                    } else if (operator === '+') {
                        arr[1] = curr + (arr[1] || 0)
                    } else {
                        arr[0] = (arr[1] || 1) * curr * (arr[0] || 1)
                        arr[1] = null
                    }
                }
                return arr
            }
            let lineTotal = [null, null]
            operator = ''
            let i = 0
            let parenResults = []
            while (i < line.length) {
                if (typeof line[i] === 'number') {
                    if (parenResults.length === 0) {
                        lineTotal = mather(lineTotal, line[i], operator)
                    } else {
                        parenResults[parenResults.length - 1] =
                            mather(parenResults[parenResults.length - 1], line[i], operator, true)
                    }
                } else if (line[i] === '(') {
                    const prevOp = line[i - 1]
                    parenResults.push([null, null, prevOp === '+' || prevOp === '*' ? prevOp : ''])
                    operator = ''
                } else if (line[i] === ')') {
                    const popped = parenResults.pop()
                    const res = (popped[0] || 1) * (popped[1] || 1)
                    if (parenResults.length === 0) {
                        lineTotal = mather(lineTotal, res, popped[2])
                    } else {
                        parenResults[parenResults.length - 1] =
                            mather(parenResults[parenResults.length - 1], res, popped[2], true)
                    }
                } else {
                    operator = line[i]
                }
                i++
            }
            total += (lineTotal[0] || 1) * (lineTotal[1] || 1)
        })
    }
    return total
}

const expected = part => part === 1 ? 654686398176 : 8952864356993

module.exports = { solve, expected }
