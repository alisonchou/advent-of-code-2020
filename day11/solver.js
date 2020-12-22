function solve(input, part) {
    input = input.map(s => s.split(''))
    const arrEquals = (arr1, arr2) =>
        arr1.reduce((bool, row, index) =>
            bool && row.reduce((secondBool, seat, seatIndex) =>
            secondBool & seat === arr2[index][seatIndex], true)
            , true)
    const hasOcc = (indexes, direction, array, view) => {
        if (direction === "left") {
            if (view) {
                for (let i = indexes[1] - 1; i >= 0; i--) {
                    if (array[indexes[0]][i] === '#') {
                        return true
                    } else if (array[indexes[0]][i] === 'L') {
                        return false
                    }
                }
            } else {
                return array[indexes[0]][indexes[1] - 1] === '#'
            }
        } else if (direction === "right") {
            if (view) {
                for (let i = indexes[1] + 1; i < array[0].length; i++) {
                    if (array[indexes[0]][i] === '#') {
                        return true
                    } else if (array[indexes[0]][i] === 'L') {
                        return false
                    }
                }
            } else {
                return array[indexes[0]][indexes[1] + 1] === '#'
            }
        } else if (direction === "top") {
            if (view) {
                for (let i = indexes[0] - 1; i >= 0; i--) {
                    if (array[i][indexes[1]] === '#') {
                        return true
                    } else if (array[i][indexes[1]] === 'L') {
                        return false
                    }
                }
            } else {
                return array[indexes[0] - 1][indexes[1]] === '#'
            }
        } else if (direction === "bottom") {
            if (view) {
                for (let i = indexes[0] + 1; i < array.length; i++) {
                    if (array[i][indexes[1]] === '#') {
                        return true
                    } else if (array[i][indexes[1]] === 'L') {
                        return false
                    }
                }
            } else {
                return array[indexes[0] + 1][indexes[1]] === '#'
            }
        } else if (direction === "topLeft") {
            if (view) {
                for (let i = indexes[0] - 1, j = indexes[1] - 1; i >= 0 && j >= 0; i--, j--) {
                    const elem = array[i][j]
                    if (elem === '#') {
                        return true
                    } else if (elem === 'L') {
                        return false
                    }
                }
            } else {
                return array[indexes[0] - 1][indexes[1] - 1] === '#'
            }
        } else if (direction === "btmLeft") {
            if (view) {
                for (let i = indexes[0] + 1, j = indexes[1] - 1; i < array.length && j >= 0; i++, j--) {
                    const elem = array[i][j]
                    if (elem === '#') {
                        return true
                    } else if (elem === 'L') {
                        return false
                    }
                }
            } else {
                return array[indexes[0] + 1][indexes[1] - 1] === '#'
            }
        } else if (direction === "topRight") {
            if (view) {
                for (let i = indexes[0] - 1, j = indexes[1] + 1; i >= 0 && j < array[0].length; i--, j++) {
                    const elem = array[i][j]
                    if (elem === '#') {
                        return true
                    } else if (elem === 'L') {
                        return false
                    }
                }
            } else {
                return array[indexes[0] - 1][indexes[1] + 1] === '#'
            }
        } else if (direction === "btmRight") {
            if (view) {
                for (let i = indexes[0] + 1, j = indexes[1] + 1; i < array.length && j < array[0].length; i++, j++) {
                    const elem = array[i][j]
                    if (elem === '#') {
                        return true
                    } else if (elem === 'L') {
                        return false
                    }
                }
            } else {
                return array[indexes[0] + 1][indexes[1] + 1] === '#'
            }
        }
        return false
    }
    const toOccupied = (array, view) => {
        let newArray = JSON.parse(JSON.stringify(array))
        const lastRow = array.length - 1
        const lastCol = array[0].length - 1
        array.forEach((row, rowIndex) => {
            row.forEach((seat, seatIndex) => {
                if (seat === 'L'
                    && (seatIndex === 0 || !hasOcc([rowIndex, seatIndex], 'left', array, view))
                    && (seatIndex === lastCol || !hasOcc([rowIndex, seatIndex], 'right', array, view))
                    && (rowIndex === 0 ||
                        (
                            (seatIndex === 0 || !hasOcc([rowIndex, seatIndex], 'topLeft', array, view))
                            &&  !hasOcc([rowIndex, seatIndex], 'top', array, view)
                            && (seatIndex === lastCol || !hasOcc([rowIndex, seatIndex], 'topRight', array, view))
                        )
                    ) && (rowIndex === lastRow ||
                        (
                            (seatIndex === 0 || !hasOcc([rowIndex, seatIndex], 'btmLeft', array, view))
                            &&  !hasOcc([rowIndex, seatIndex], 'bottom', array, view)
                            && (seatIndex === lastCol || !hasOcc([rowIndex, seatIndex], 'btmRight', array, view))
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
            return toUnoccupied(newArray, view)
        }
    }
    const toUnoccupied = (array, view) => {
        let newArray = JSON.parse(JSON.stringify(array))
        const lastRow = array.length - 1
        const lastCol = array[0].length - 1
        array.forEach((row, rowIndex) => {
            row.forEach((seat, seatIndex) => {
                let adjOccupied = 0
                if (seat === '#') {
                    if (rowIndex !== 0 && hasOcc([rowIndex, seatIndex], 'top', array, view)) {
                        adjOccupied += 1
                    }
                    if (rowIndex !== lastRow && hasOcc([rowIndex, seatIndex], 'bottom', array, view)) {
                        adjOccupied += 1
                    }
                    if (seatIndex !== 0) {
                        if (hasOcc([rowIndex, seatIndex], 'left', array, view)) {
                            adjOccupied += 1
                        }
                        if (rowIndex !== 0 && hasOcc([rowIndex, seatIndex], 'topLeft', array, view)) {
                            adjOccupied += 1
                        }
                        if (rowIndex !== lastRow && hasOcc([rowIndex, seatIndex], 'btmLeft', array, view)) {
                            adjOccupied += 1
                        }
                    }
                    if (seatIndex !== lastCol) {
                        if (hasOcc([rowIndex, seatIndex], 'right', array, view)) {
                            adjOccupied += 1
                        }
                        if (rowIndex !== 0 && hasOcc([rowIndex, seatIndex], 'topRight', array, view)) {
                            adjOccupied += 1
                        }
                        if (rowIndex !== lastRow && hasOcc([rowIndex, seatIndex], 'btmRight', array, view)) {
                            adjOccupied += 1
                        }
                    }
                }
                if (view) {
                    if (adjOccupied >= 5) {
                        newArray[rowIndex][seatIndex] = 'L'
                    }
                } else {
                    if (adjOccupied >= 4) {
                        newArray[rowIndex][seatIndex] = 'L'
                    }
                }
            })
        })
        if (arrEquals(array, newArray)) {
            return newArray
        } else {
            return toOccupied(newArray, view)
        }
    }
    return part === 1 ?
        toOccupied(input, false).reduce((count, row) =>
            count + row.reduce((count2, seat) => seat === '#' ? count2 + 1 : count2, 0)
            , 0)
        :
        toOccupied(input, true).reduce((count, row) =>
            count + row.reduce((count2, seat) => seat === '#' ? count2 + 1 : count2, 0)
            , 0)
}

const expected = part => part === 1 ? 2483 : 2285

module.exports = { solve, expected }
