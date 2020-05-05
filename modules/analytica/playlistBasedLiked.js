const Film = require('../../models/Film')
const { analysis } = require('../analytica/analytica')

require('../../utils/util.js')

const findFilmsByLiked = async (analisedData) => {

    const genres = analisedData.map(options => Object.keys(options.genr)).flat()
    const actors = analisedData.map(options => Object.keys(options.cast)).flat()
    const tags = analisedData.map(options => Object.keys(options.tags)).flat()
    const ids = analisedData.map(options => Object.values(options.name)).flat()
    
    try {
        const films = await Film.aggregate([
            {
                $lookup: {
                    from: 'actors',
                    localField: '_id',
                    foreignField: 'films._id',
                    as: 'cast',
                }
            },
            {
                $match: {
                    name: {
                        $nin: ids
                    },
                    genr: {
                        $in: genres
                    },
                    tags: {
                        $in: tags
                    },
                    // cast: {
                    //     $elemMatch: {
                    //         actorName: {
                    //             $in: actors
                    //         }
                    //     }
                    // }
                }
            },
            {
                $project: {
                    name: 1,
                    img: 1,
                }
            }
        ])
        
        // films.shuffle()
        console.log(films)

        const playlist = {
            playlistName: 'Recommended',
            describe: 'Based on your watching history for last week',
            films
        }

        return playlist
    
    } catch (err) {
        console.log(err)
    }
}


module.exports = { findFilmsByLiked }
