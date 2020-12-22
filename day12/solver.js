function solve(input, part) {
    input = input.map(s => [s.slice(0, 1), Number(s.slice(1))])
    const move = (position, direction, instruction, times = 1) => {
        if (direction === 1 || direction === 'E') {
            position[0] += instruction * times
        } else if (direction === 3 || direction === 'W') {
            position[0] -= instruction * times
        } else if (direction === 0 || direction === 'N') {
            position[1] += instruction * times
        } else if (direction === 2 || direction === 'S') {
            position[1] -= instruction * times
        }
        return position
    }
    if (part === 1) {
        let position = [1, 0, 0]
        input.forEach(instruction => {
            if (instruction[0] === 'F') {
                position = [position[0], ...move([position[1], position[2]], position[0], instruction[1])]
            } else if (instruction[0] === 'R') {
                for (let i = 0; i < instruction[1] / 90; i++) {
                    position[0] += 1
                    if (position[0] > 3) {
                        position[0] -= 4
                    }
                }
            } else if (instruction[0] === 'L') {
                for (let i = 0; i < instruction[1] / 90; i++) {
                    position[0] -= 1
                    if (position[0] < 0) {
                        position[0] += 4
                    }
                }
            } else {
                position = [position[0], ...move([position[1], position[2]], instruction[0], instruction[1])]
            }
        })
        return Math.abs(position[1]) + Math.abs(position[2])
    } else {
        let position = [0, 0] //  e, n
        let waypoint = [10, 1] // e, n
        input.forEach(instruction => {
            if (instruction[0] === 'F') {
                position = [move(position, 1, waypoint[0], instruction[1])[0],
                    move(position, 0, waypoint[1], instruction[1])[1]]
            } else if (instruction[0] === 'R') {
                for (let i = 0; i < instruction[1] / 90; i++) {
                    waypoint = [waypoint[1], -waypoint[0]]
                }
            } else if (instruction[0] === 'L') {
                for (let i = 0; i < instruction[1] / 90; i++) {
                    waypoint = [-waypoint[1], waypoint[0]]
                }
            } else {
                waypoint = move(waypoint, instruction[0], instruction[1])
            }
        })
        return Math.abs(position[0]) + Math.abs(position[1])
    }
}

const expected = part => part === 1 ? 1710 : 62045

module.exports = { solve, expected }
