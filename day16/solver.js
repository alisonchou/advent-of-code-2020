function solve(input, part) {
    input = input.map(s => s.split('\n').filter(t => t.length > 0))
    input[0] = input[0].map(r => {
        const splitColon = r.split(': ')
        return [splitColon[0], splitColon[1].split(' or ')
            .map(s => s.split('-').map(t => Number(t)))]
    })
    input[1] = input[1][1].split(',').map(s => Number(s))
    input[2].shift()
    input[2] = input[2].map(s => s.split(',').map(t => Number(t)))
    const max = input[0].reduce((max, field) => {
        const fieldMax = field.reduce((fieldMax, rangeSet) => {
            if (typeof rangeSet !== 'string') {
                const rangeMax = rangeSet.reduce((rangeMax, range) => range[1] > rangeMax ? range[1] : rangeMax, -1)
                return rangeMax > fieldMax ? rangeMax : fieldMax
            }
            return fieldMax
        }, -1)
        return fieldMax > max ? fieldMax : max
    }, -1)
    let nums = new Array(max)
    for (let i = 1; i <= max; i++) {
        nums[i] = input[0].filter(field => field.find(rangeSet => typeof rangeSet !== 'string'
            && rangeSet.find(range => range[1] >= i && range[0] <= i)) != null)
    }
    if (part === 1) {
        return input[2].reduce((sum, ticket) => sum + ticket.reduce((ticketSum, val) =>
            nums[val] == null || nums[val].length <= 0 ? ticketSum + val : ticketSum, 0), 0)
    } else {
        let ticketFields = []
        for (let field = 0; field < input[2][0].length; field++) {
            let eligibleFields = null
            for (let ticket = 0; ticket < input[2].length; ticket++) {
                const ticketVal = nums[input[2][ticket][field]]
                if (ticketVal != null && ticketVal.length > 0) {
                    if (eligibleFields == null) {
                        eligibleFields = ticketVal.map(f => f[0])
                    } else {
                        eligibleFields = eligibleFields.filter(s => ticketVal.find(f => f[0] === s))
                    }
                }
            }
            ticketFields.push([field, eligibleFields])
        }
        ticketFields.sort((a, b) => a[1].length - b[1].length)
        let newTikFields = []
        ticketFields.forEach(fields => {
            fields[1].forEach(field => {
                if (newTikFields.indexOf(field) === -1) {
                    newTikFields[fields[0]] = field
                }
            })
        })
        return input[1].reduce((product, field, index) =>
            newTikFields[index].indexOf('departure') !== -1 ? product * field : product, 1)
    }
}

const expected = part => part === 1 ? 25916 : 2564529489989

module.exports = { solve, expected }
