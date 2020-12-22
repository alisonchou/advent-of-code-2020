function solve(input, part) {
    input = input.map(s => s.split(''))
    if (part === 1) {
        const arrEquals = (arr1, arr2) =>
            arr1.reduce((bool, row, index) =>
                bool && row.reduce((secondBool, seat, seatIndex) =>
                secondBool & seat === arr2[index][seatIndex], true)
            , true)
        const toOccupied = array => {
            let newArray = JSON.parse(JSON.stringify(array))
            const lastRow = array.length - 1
            const lastCol = array[0].length - 1
            array.forEach((row, rowIndex) => {
                row.forEach((seat, seatIndex) => {
                    if (seat === 'L'
                        && (seatIndex === 0 || array[rowIndex][seatIndex - 1] !== '#')
                        && (seatIndex === lastCol || array[rowIndex][seatIndex + 1] !== '#')
                        && (rowIndex === 0 ||
                            (
                                (seatIndex === 0 || array[rowIndex - 1][seatIndex - 1] !== '#')
                                && array[rowIndex - 1][seatIndex] !== '#'
                                && (seatIndex === lastCol || array[rowIndex - 1][seatIndex + 1] !== '#')
                            )
                        ) && (rowIndex === lastRow ||
                            (
                                (seatIndex === 0 || array[rowIndex + 1][seatIndex - 1] !== '#')
                                && array[rowIndex + 1][seatIndex] !== '#'
                                && (seatIndex === lastCol || array[rowIndex + 1][seatIndex + 1] !== '#')
                            )
                        )
                    ) {
                            newArray[rowIndex][seatIndex] = '#'
                    }
                })
            })
            if (arrEquals(array, newArray)) {
                return newArray
            } else {
                return toUnoccupied(newArray)
            }
        }
        const toUnoccupied = array => {
            let newArray = JSON.parse(JSON.stringify(array))
            const lastRow = array.length - 1
            const lastCol = array[0].length - 1
            array.forEach((row, rowIndex) => {
                row.forEach((seat, seatIndex) => {
                    let adjOccupied = 0
                    if (seat === '#') {
                        if (rowIndex !== 0 && array[rowIndex - 1][seatIndex] === '#') {
                            adjOccupied += 1
                        }
                        if (rowIndex !== lastRow && array[rowIndex + 1][seatIndex] === '#') {
                            adjOccupied += 1
                        }
                        if (seatIndex !== 0) {
                            if (array[rowIndex][seatIndex - 1] === '#') {
                                adjOccupied += 1
                            }
                            if (rowIndex !== 0 && array[rowIndex - 1][seatIndex - 1] === '#') {
                                adjOccupied += 1
                            }
                            if (rowIndex !== lastRow && array[rowIndex + 1][seatIndex - 1] === '#') {
                                adjOccupied += 1
                            }
                        }
                        if (seatIndex !== lastCol) {
                            if (array[rowIndex][seatIndex + 1] === '#') {
                                adjOccupied += 1
                            }
                            if (rowIndex !== 0 && array[rowIndex - 1][seatIndex + 1] === '#') {
                                adjOccupied += 1
                            }
                            if (rowIndex !== lastRow && array[rowIndex + 1][seatIndex + 1] === '#') {
                                adjOccupied += 1
                            }
                        }
                    }
                    if (adjOccupied >= 4) {
                        newArray[rowIndex][seatIndex] = 'L'
                    }
                })
            })
            if (arrEquals(array, newArray)) {
                return newArray
            } else {
                return toOccupied(newArray)
            }
        }
        return toOccupied(input).reduce((count, row) =>
            count + row.reduce((count2, seat) => seat === '#' ? count2 + 1 : count2, 0)
        , 0)
    }
}

const expected = part => part === 1 ? 2483 : -1

module.exports = { solve, expected }
