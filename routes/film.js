const { Router } = require('express')
const multer = require('multer')
const { promises: fs } = require('fs')
const mongoose = require('mongoose')
// const { analysis } = require('../modules/analytica')

const Film = require('../models/Film')
const Rating = require('../models/Rating')

const router = Router()

const upload = multer({
    dest: `public/`,
  });


router.post('/film/create', async(req, res) => {
    const { 
        name, 
        year, 
        genr, 
        type, 
        director, 
        describe, 
        duration, 
        country, 
        release, 
        audio, 
        subtitles,
        company, 
        tags
    } = req.body

    try {
        const newFilm = new Film({
            name, 
            year, 
            genr, 
            type, 
            director, 
            describe, 
            duration, 
            country, 
            release, 
            audio, 
            subtitles, 
            company,
            tags
        })

        await newFilm.save()
        await newFilm.updateOne({ 
            $set: {
                img: `/static/${newFilm._id}/poster.jpg`,
                wallpaper: `/static/${newFilm._id}/wallpaper.jpg`
            }
        })
        await new Rating({ 
            filmId: newFilm._id,
            rating: [
                {
                    likes: []
                },
                {
                    dislikes: []
                }
            ] 
        }).save()


        await fs.mkdir(`public/${newFilm._id}`)
        
        res.status(201).json({
            message: 'Film has been created'
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.post('/film/:name/image', upload.fields([{name: 'file'}]), async(req, res) => {   
    try {
        
        if(!req.file) {
            res.status(404).json({
                message: 'No file'
            })
        }

        res.status(201).json({
            message: 'File has been uploaded'
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
}) 

router.put('/film/:id/update', async(req, res) => {
    const {  
        name, 
        year, 
        genr, 
        type, 
        director, 
        writers, 
        describe, 
        duration, 
        country, 
        release, 
        audio, 
        subtitles,
        company, 
        tags, 
        cast, 
        series } = req.body
    
    try {
        await Film.findByIdAndUpdate( req.params.id, 
            {   name, 
                year, 
                genr, 
                type, 
                director, 
                writers, 
                describe, 
                duration, 
                country, 
                release, 
                audio, 
                subtitles,
                company, 
                tags, 
                cast, 
                series 
            }
        )

        res.status(200).json({
            message: 'Film has been updated'
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})
router.put('/film/:id/update/img', async(req, res) => {    
    try {
        await Film.findByIdAndUpdate( req.params.id, 
            {
                img: `/static/${req.params.id}/poster.jpg`
            }
        )

        res.status(200).json({
            message: 'Image has been updated'
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})


router.delete('/film/:id/delete', async(req, res) => {
    try {
        await Film.findByIdAndRemove( req.params.id )

        res.status(200).json({
            message: 'Film has been deleted'
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})



router.get('/films', async(req, res) => {
    try {        
        const films = await Film.find({})

        if(!films) {
            return res.status(400).json({ message: 'Films not founded' })
        }

        const filmsAll = films.map(item => ({
            _id: item._id,
            name: item.name,
            describe: item.describe,
            img: item.img,
            type: item.type
        })).reverse()

        res.status(200).json({
            message: 'Films loaded',
            data: filmsAll
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.get('/film/cast', async(req, res) => {
    try {
        const cast = await Film.find({}, {cast: 1, _id: 0})
        const castAll = cast.map(item => item.cast)

        res.json(castAll)

        res.status(200).json({
            message: 'Cast loaded'
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.get('/film/:id', async(req, res) => {
    try {
        const aggregate = await Film.aggregate([
            {
                $match: {
                  _id: mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                $lookup: {
                    from: 'actors',
                    let: {
                        id: mongoose.Types.ObjectId(req.params.id)
                    },
                    pipeline: [
                        { $unwind: "$films" },
                        { $match: { $expr: { $eq: [ "$films._id",  "$$id" ] }, }},
                    ],
                    as: 'cast',
            }
        }
    ])
        const projection = { 
            _id: 1,
            img: 1,
            name: 1
        }
        const similar = await Film.find({
            tags: {
                $in: aggregate[0].tags
            }
        }, projection)

        const filtredSimilar = similar.filter(film => film.name !== aggregate[0].name)                

        res.status(200).json({
            film: aggregate[0],
            similar: filtredSimilar,
            message: 'Film has been loaded'
        })
        
        const data = analysis()

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})


router.post('/film/dir', async(req, res) => {
    const { filmId, episodeId, seasonId } = req.body
    const path = `public/${filmId}/${episodeId}`

    console.log(req.body)

   try {
    await Film.updateOne(
        { 
            _id: mongoose.Types.ObjectId(filmId),
            'series._id': mongoose.Types.ObjectId(episodeId),

        }, 
        { $set: {'series.$.img': `/static/${filmId}/${episodeId}/poster.jpg`}
    })
    await fs.mkdir(path)

    res.status(200).json({
        message: 'Folder has been created'
    })

   } catch (err) {
        console.log(err)
        res.status(400).json({
            message: 'Something went wrong'
        })
   }
    
})


router.post('/film/episode/add', async (req, res) => {
    const { episode, filmId } = req.body     

    try {
        
        await Film.updateOne(
            { 
                _id: mongoose.Types.ObjectId(filmId),
            }, 
            { $push: {'series': {
                ...episode,
                _id: mongoose.Types.ObjectId()
            }}
        })

        res.status(201).json({
            message: 'Episode has been added'
        })

    } catch(err) {
        res.status(400).json({
            message: 'Somethig went wrong'
        })
    }
})

router.post('/film/season/create', async (req, res) => {
    const { season, filmId } = req.body     
    try {
        
        await Film.updateOne(
            { 
                _id: mongoose.Types.ObjectId(filmId)
            }, 
            { $push: {'series': {
                season: season,
                _id: mongoose.Types.ObjectId(),
                films: []
            }}
        })

        res.status(201).json({
            message: 'Season has been created'
        })

    } catch(err) {
        res.status(400).json({
            message: 'Somethig went wrong'
        })
    }
})



module.exports = router