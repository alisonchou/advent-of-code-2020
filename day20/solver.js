function solve(input, part) {
    const seaMonster = input.shift().split('\n').map(l => l.split(''))
    input = input.map(tile => {
        tile = tile.split(':')
        tile[0] = Number(tile[0].substring(5))
        tile[1] = tile[1].split('\n').filter(s => s.length > 0).map(s => s.split(''))
        return tile
    })
    const edgeLen = Math.sqrt(input.length)
    const rotateRight = tile => tile[0].map((_, colIndex) =>
        tile.map(row => row[colIndex])).map(row => row.reverse())
    const flip = tile => tile.reverse()
    const same = tile => tile
    const actions = [
        same, rotateRight,
        rotateRight, rotateRight,
        flip, rotateRight,
        rotateRight, rotateRight
    ]
    const notEqual = (tileA, tileB) => tileA.find((val, index) => val !== tileB[index])
    const tileFits = (valid, tile) => {
        if (valid.length + 1 > edgeLen) {
            if (notEqual(tile[0], valid[valid.length - edgeLen][1][tile.length - 1])) {
                return false
            }
        }
        if ((valid.length + 1) % edgeLen !== 1) {
            const tileLeft = tile.reduce((arr, row) => arr.concat(row[0]), [])
            const lastRight = valid[valid.length - 1][1].reduce((arr, row) => arr.concat(row[row.length - 1]), [])
            if (notEqual(tileLeft, lastRight)) {
                return false
            }
        }
        return true
    }
    const findOrder = (valid = []) => {
        if (valid.length === input.length) {
            return valid
        }
        let result = null
        input.find(tile => valid.every(t => t[0] !== tile[0]) &&
            actions.find(action => {
                tile[1] = action(tile[1])
                if (tileFits(valid, tile[1])) {
                    const res = findOrder(valid.concat([tile]))
                    if (res != null) {
                        result = res
                        return true
                    }
                }
            })
        )
        return result
    }
    const valid = findOrder()
    if (part === 1) {
        return valid[0][0] * valid[edgeLen - 1][0] * valid[valid.length - edgeLen][0] * valid[valid.length - 1][0]
    } else {
        const longest = seaMonster.reduce((max, row) => row.length > max ? row.length : max, -1)
        const hasMonster = arr => {
            let foundMonster = false
            arr.forEach((row, rowIndex) => {
                if (arr.length >= rowIndex + seaMonster.length) {
                    const cut = arr.slice(rowIndex, rowIndex + seaMonster.length)
                    return row.forEach((char, colIndex) => {
                        if (cut[0].length >= colIndex + longest) {
                            const hCut = cut.map(s => s.slice(colIndex, colIndex + longest))
                            if (seaMonster.every((row, rowIndex) => row.every((char, index) =>
                                char !== '#' || hCut[rowIndex][index] === '#'))) {
                                if (!foundMonster) {
                                    foundMonster = true
                                }
                                seaMonster.forEach((row, miniRIndex) => {
                                    row.forEach((char, miniCIndex) => {
                                        if (char === '#') {
                                            arr[rowIndex + miniRIndex][colIndex + miniCIndex] = 'O'
                                        }
                                    })
                                })
                            }
                        }
                    })
                }
            })
            return foundMonster ? arr : false
        }
        let assembled = []
        valid.map(tile => {
            tile = tile[1]
            tile.shift()
            tile.pop()
            return tile.map(row => {
                row.shift()
                row.pop()
                return row
            })
        }).forEach((tile, tileIndex) => {
            tile.forEach((row, index) => {
                if (tileIndex % edgeLen === 0) {
                    assembled.push(row)
                } else {
                    const indexToAdd = index + tile.length * Math.floor(tileIndex / edgeLen)
                    assembled[indexToAdd] = assembled[indexToAdd].concat(row)
                }
            })
        })
        actions.find(action => {
            assembled = action(assembled)
            const check = hasMonster(assembled)
            if (check) {
                assembled = check
                return true
            }
        })
        return assembled.reduce((count, row) =>
            count + row.reduce((rowCount, char) => char === '#' ? rowCount + 1 : rowCount, 0), 0)
    }
}

const expected = part => part === 1 ? 5966506063747 : 1714

module.exports = { solve, expected }
