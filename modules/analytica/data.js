const mongoose = require('mongoose')

const Activity = require('../../models/Activity')
const Film = require('../../models/Film')
const UserPlaylist = require('../../models/UserPlaylist')

const getWatchingData = async () => {
    try {
        const watchingData = await Activity.findOne(
            {
                userId: mongoose.Types.ObjectId('5e99debd0c68951080b3f2b3'),
            },
            {
                history: 1
            }
        )

    let filmIds = []
    const getData = watchingData.history.map(data => data.data).flat()
    const filtredData = getData.filter(film => film.activityType === 'watching')
    filtredData.forEach(o => filmIds.push(mongoose.Types.ObjectId(o.film._id)))

    const test = await Film.aggregate([
        {
           $match: {
               _id: {
                   $in: filmIds
               }
           } 
        },
        {
            $lookup: {
                from: 'actors',
                localField: '_id',
                foreignField: 'films._id',
                as: 'cast',
            }
        },
        {
            $project: {
                genr: 1,
                cast: 1,
                tags: 1,
                director: 1,
                company: 1,
                name: 1,
            }
        }
    ])

    return {
        genr: [].concat.apply([], test.map(genr => genr.genr)),
        director: [].concat.apply([], test.map(director => director.director)),
        cast: [].concat.apply([], test.map( cast => cast.cast).flat().map(actor => actor.actorName)),
        tags: [].concat.apply([], test.map(tags => tags.tags)),
        name: test.map(film => film.name)
    }

    } catch(err) {
        console.log(err)
    }
}

const getLikedData = async () => {

    try {
        const likedData = await UserPlaylist.aggregate([
            {
                $match: { userId: mongoose.Types.ObjectId('5e99debd0c68951080b3f2b3')}
            },
            {
                $lookup: {
                    from: 'films',
                    localField: 'liked',
                    foreignField: '_id',
                    as: 'liked',
                }
            },    
            {
                $project: {
                    liked: 1,
                    name: 1,
                    tags: 1
                }
            },
            {
                $lookup: {
                    from: 'actors',
                    localField: 'liked._id',
                    foreignField: 'films._id',
                    as: 'cast',
            }
        }
    ])

   

    return {
            genr: [].concat.apply([], likedData[0].liked.map(genr => genr.genr)),
            director: [].concat.apply([], likedData[0].liked.map(genr => genr.director)),
            cast: [].concat.apply([], likedData.map( cast => cast.cast).flat().map(actor => actor.actorName)),
            tags: [].concat.apply([], likedData[0].liked.map(tags => tags.tags)),
            name: likedData.map(liked => liked.liked).flat().map(film => film.name)
        }

    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    getWatchingData,
    getLikedData
}