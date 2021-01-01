function solve(input, part) {
    input = input.map(line => {
        const splitCn = line.split(' (contains ')
        splitCn[0] = splitCn[0].split(' ')
        splitCn[1] = splitCn[1].slice(0, -1).split(', ')
        return splitCn
    })
    const allergens = {}
    input.forEach(food => {
        food[1].forEach(allergen => {
            if (!allergens.hasOwnProperty(allergen)) {
                let arr = food[0]
                input.forEach(f => {
                    if (f[1].indexOf(allergen) !== -1) {
                        arr = arr.filter(ing => f[0].indexOf(ing) !== -1)
                    }
                })
                allergens[allergen] = arr
            }
        })
    })
    if (part === 1) {
        const ingredients = [...new Set(Object.values(allergens).flat())]
        return input.reduce((count, food) => count + food[0].reduce((count2, ing) =>
            ingredients.indexOf(ing) === -1 ? count2 + 1 : count2, 0)
        , 0)
    } else {
        const finalAllergens = {}
        Object.keys(allergens).sort((a, b) => allergens[a].length - allergens[b].length)
            .forEach(key => {
                finalAllergens[key] = allergens[key].filter(s =>
                    Object.values(finalAllergens).every(ingList => ingList.length > 1 ? true : ingList[0] !== s))
            })
        Object.keys(finalAllergens).forEach(key => {
            if (finalAllergens[key].length > 1) {
                finalAllergens[key] = finalAllergens[key].filter(s =>
                    Object.values(finalAllergens).every(ingList => ingList.length > 1 ? true : ingList[0] !== s)
                )
            }
        })
        return Object.keys(finalAllergens).sort()
            .reduce((arr, key) => arr.concat(finalAllergens[key]), []).toString()
    }
}

const expected = part => part === 1 ? 2317 : 'kbdgs,sqvv,slkfgq,vgnj,brdd,tpd,csfmb,lrnz'

module.exports = { solve, expected }
