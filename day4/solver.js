function solve(input, part) {
    return input.reduce((total, entry, index) => {
        const count = Object.keys(entry).length
        if (count === 8 || (count === 7 && !entry.hasOwnProperty('cid'))) {
            if (part === 1) {
                return total + 1
            } else {
                if (
                    Number(entry.byr) >= 1920 && Number(entry.byr) <= 2002 &&
                    Number(entry.iyr) >= 2010 && Number(entry.iyr) <= 2020 &&
                    Number(entry.eyr) >= 2020 && Number(entry.eyr) <= 2030 &&
                    /^#([0-9]|[a-f]){6}$/.test(entry.hcl) &&
                    /^amb$|^blu$|^brn$|^gry$|^grn$|^hzl$|^oth$/.test(entry.ecl) &&
                    /^\d{9}$/.test(entry.pid)
                ) {
                    const cmIndex = entry.hgt.indexOf('cm')
                    const inIndex = entry.hgt.indexOf('in')
                    if (cmIndex !== -1) {
                        const num = Number(entry.hgt.substring(0, cmIndex))
                        if (num >= 150 && num <= 193) {
                            return total + 1
                        }
                    } else if (inIndex !== -1) {
                        const num = Number(entry.hgt.substring(0, inIndex))
                        if (num >= 59 && num <= 76) {
                            return total + 1
                        }
                    }
                }
            }
        }
        return total
    }, 0)
}

const expected = part => part === 1 ? 213 : 147

module.exports = { solve, expected }
