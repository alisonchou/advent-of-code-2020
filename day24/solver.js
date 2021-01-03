function solve(input, part) {
    input = input.map(s => s.split(''))
    const doubledCs = { e: [2, 0], se: [1, -1], sw: [-1, -1], w: [-2, 0], nw: [-1, 1], ne: [1, 1] }
    const hasTile = (arr, tile) => arr.findIndex(t => t[0] === tile[0] && t[1] === tile[1])
    let blackTiles = input.reduce((flipped, dirs) => {
        let i = 0, tile = [0, 0]
        while (i < dirs.length) {
            let instructions
            if (dirs[i] === 'e' || dirs[i] === 'w') {
                instructions = doubledCs[dirs[i]]
            } else {
                instructions = doubledCs[dirs[i] + dirs[i + 1]]
                i++
            }
            tile[0] += instructions[0]
            tile[1] += instructions[1]
            i++
        }
        const exists = hasTile(flipped, tile)
        if (exists !== -1) {
            flipped.splice(exists, 1)
            return flipped
        } else {
            return flipped.concat([tile])
        }
    }, [])
    if (part === 2) {
        for (let i = 0; i < 100; i++) {
            let toBlack = [], toWhite = [], whiteChecked = []
            blackTiles.forEach(tile => {
                let blacksAdj = 0
                Object.values(doubledCs).forEach(nbr => {
                    const neighbor = [tile[0] + nbr[0], tile[1] + nbr[1]]
                    if (hasTile(blackTiles, neighbor) !== -1) {
                        blacksAdj++
                    } else if (hasTile(whiteChecked, neighbor) === -1) {
                        whiteChecked.push(neighbor)
                        if (Object.values(doubledCs).reduce((adj, nbr) =>
                            hasTile(blackTiles, [neighbor[0] + nbr[0], neighbor[1] + nbr[1]]) !== -1
                                ? adj + 1 : adj, 0) === 2) {
                            toBlack.push(neighbor)
                        }
                    }
                })
                if (blacksAdj === 0 || blacksAdj > 2) {
                    toWhite.push(tile)
                }
            })
            toBlack.forEach(tile => {
                blackTiles.push(tile)
            })
            toWhite.forEach(tile => {
                blackTiles = blackTiles.filter(t => t[0] !== tile[0] || t[1] !== tile[1])
            })
        }
    }
    return blackTiles.length
}

const expected = part => part === 1 ? 450 : 4059

module.exports = { solve, expected }
