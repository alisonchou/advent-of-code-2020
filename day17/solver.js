function solve(input, part) {
    const searcher = (fourth, plane, row, col, addSelf) => {
        const planeSearcher = (plane, row, col, addSelf) => {
            const itemSearcher = (addRow, addSelf = true) => {
                if (addSelf && plane[row + addRow][col] === '#') {
                    actives++
                }
                if (plane[row + addRow][col + 1] === '#') {
                    actives++
                }
                if (plane[row + addRow][col - 1] === '#') {
                    actives++
                }
            }
            itemSearcher(0, addSelf)
            if (plane[row + 1] != null) {
                itemSearcher(1)
            }
            if (plane[row - 1] != null) {
                itemSearcher(-1)
            }
        }
        let actives = 0
        planeSearcher(fourth[plane], row, col, addSelf)
        if (fourth[plane + 1] != null) {
            planeSearcher(fourth[plane + 1], row, col)
        }
        if (fourth[plane - 1] != null) {
            planeSearcher(fourth[plane - 1], row, col)
        }
        return actives
    }
    const addDims = fourth => {
        fourth = fourth.map(plane => {
            plane = plane.map(row => {
                row.unshift('.')
                row.push('.')
                return row
            })
            plane.unshift(new Array(plane[0].length).fill('.'))// add new rows
            plane.push(new Array(plane[0].length).fill('.'))
            return plane
        })
        fourth.unshift(new Array(fourth[0].length).fill(new Array(fourth[0][0].length).fill('.')))
        fourth.push(new Array(fourth[0].length).fill(new Array(fourth[0][0].length).fill('.')))
        return fourth
    }
    input = [input.map(line => line.split(''))]
    let newArray
    if (part === 1) {
        for (let i = 0; i < 6; i++) {
            input = addDims(input)
            newArray = JSON.parse(JSON.stringify(input))
            for (let plane = 0; plane < input.length; plane++) {
                for (let row = 0; row < input[0].length; row++) {
                    for (let col = 0; col < input[0][0].length; col++) {
                        let actives = searcher(input, plane, row, col, false)
                        if (input[plane][row][col] === '#') {
                            if (row === 1 && col === 0) {
                            }
                            if (actives !== 2 && actives !== 3) {
                                newArray[plane][row][col] = '.'
                            }
                        } else {
                            if (actives === 3) {
                                newArray[plane][row][col] = '#'
                            }
                        }
                    }
                }
            }
            input = JSON.parse(JSON.stringify(newArray))
        }
        return input.reduce((sum, plane) => sum + plane.reduce((planeSum, row) =>
            planeSum + row.reduce((rowSum, item) => item === '#' ? rowSum + 1 : rowSum, 0), 0), 0)
    } else {
        input = [input]
        for (let i = 0; i < 6; i++) {
            input = input.map(fourth => addDims(fourth))
            input.unshift(new Array(input[0].length).fill(new Array(input[0][0].length).fill(new Array(input[0][0][0].length).fill('.'))))
            input.push(new Array(input[0].length).fill(new Array(input[0][0].length).fill(new Array(input[0][0][0].length).fill('.'))))
            newArray = JSON.parse(JSON.stringify(input))
            for (let fourth = 0; fourth < input.length; fourth++) {
                for (let plane = 0; plane < input[0].length; plane++) {
                    for (let row = 0; row < input[0][0].length; row++) {
                        for (let col = 0; col < input[0][0][0].length; col++) {
                            let actives = searcher(input[fourth], plane, row, col, false)
                            if (input[fourth - 1] != null) {
                                actives += searcher(input[fourth - 1], plane, row, col)
                            }
                            if (input[fourth + 1] != null) {
                                actives += searcher(input[fourth + 1], plane, row, col)
                            }
                            if (input[fourth][plane][row][col] === '#') {
                                if (actives !== 2 && actives !== 3) {
                                    newArray[fourth][plane][row][col] = '.'
                                }
                            } else {
                                if (actives === 3) {
                                    newArray[fourth][plane][row][col] = '#'
                                }
                            }
                        }
                    }
                }
            }
            input = JSON.parse(JSON.stringify(newArray))
        }
        return input.reduce((sum, fourth) =>
            sum + fourth.reduce((fourthSum, plane) => fourthSum + plane.reduce((planeSum, row) =>
            planeSum + row.reduce((rowSum, item) => item === '#' ? rowSum + 1 : rowSum, 0), 0), 0), 0)
    }
}

const expected = part => part === 1 ? 304 : 1868

module.exports = { solve, expected }
