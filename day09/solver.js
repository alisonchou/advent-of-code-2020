function solve(input, part) {
    input = input.map(s => Number(s))
    if (part === 1) {
        const hasSum = (arr, target) =>
            arr.find(num => arr.find(secondNum => num + secondNum === target)) != null
        const increment = 25
        return input.find((num, index) =>
            index > increment ? !hasSum(input.slice(index - increment, index), input[index]) : false)
    } else {
        const target = 507622668
        const findNums = (start, end, addEnd, sum) => {
            if (addEnd) {
                sum += input[end]
            } else {
                sum -= input[start - 1]
            }
            if (sum > target) {
                return findNums(start + 1, end, false, sum)
            } else if (sum < target) {
                return findNums(start, end + 1, true, sum)
            } else {
                return [start, end + 1]
            }
        }
        const nums = input.slice(...findNums(0, 1, true, input[0]))
        return Math.max(...nums) + Math.min(...nums)
    }
}

const expected = part => part === 1 ? 507622668 : 76688505

module.exports = { solve, expected }
