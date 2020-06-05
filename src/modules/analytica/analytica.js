const analysis = (an) => {

    let data = Object.values(an)


    let counts = []
    for (let index = 0; index < 4; index++) {
        counts.push({})
        for (let value in data[index]) {
            if (counts[index][data[index][value]]) {
                counts[index][data[index][value]]++
            } else {
                counts[index][data[index][value]] = 1
            }
        }
    }

    Object.filter = (obj, filter) => Object.fromEntries(Object.entries(obj).filter(filter))
    let filtred = []
    for (let index = 0; index < counts.length; index++) {
        if (index < 1) {
            filtred.push(Object.filter(counts[index], ([key, value]) => value > 1))
        } else {
            filtred.push(counts[index])
        }
    }

    const obj = [
        {
            genr: {
                ...filtred[0]
            },
            director: {
                ...filtred[1]
            },
            cast: {
                ...filtred[2]
            },
            tags: {
                ...filtred[3]
            },
            name: {
                ...data[4]
            }
        }
    ]
    
    return obj
}

module.exports = {
    analysis
}
