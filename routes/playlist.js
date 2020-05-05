const { Router } = require('express')
const mongoose = require('mongoose')

const Playlist = require('../models/Playlist')
// const { findFilmsByLiked } = require('../modules/analytica/playlistBasedLiked')

const router = Router()

router.post('/playlist/create', async(req, res) => {
    const { name, films } = req.body
    const objectIdStore = []
    const ids = films.values()

    for (const id of ids) {
        let newObjectId = mongoose.Types.ObjectId(id)
        objectIdStore.push(newObjectId)
    }

    try {
        const newPlaylist = new Playlist({ name, films: objectIdStore})

        await newPlaylist.save()

        res.status(201).json({
            message: 'Playlist has been created'
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

router.get('/playlist/:index', async(req, res) => {

     try {

        // const rec = await findFilmsByLiked()

        const aggregate = await Playlist.aggregate([
            {
                $lookup: {
                    from: "films",       
                    localField: "films",   
                    foreignField: "_id", 
                    as: "playlists"         
                }
            }
        ])
        
        const data = aggregate.map(options => ({
            playlistName: options.name,
            films: options.playlists.map(o => ({
                name: o.name,
                img: o.img,
                _id: o._id,
                wallpaper: o.wallpaper,
            }))
        }))

        // let test = data.concat(rec)

        // const arrMove = (arr, fromIndex, toIndex) => {
        //     var element = arr[fromIndex];
        //     arr.splice(fromIndex, 1);
        //     arr.splice(toIndex, 0, element);
        //     return arr
        // }
        
        // const arr = arrMove(test, 7, 2)

        const fixedData = data.slice(req.params.index - 3, req.params.index)
       
        if(!fixedData.length) {
            return res.status(404).json({
                message: 'All data has been sended'
            })
        }
        res.json(fixedData)

        res.status(200).json({
            message: 'Cast loaded'
        })


    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})


module.exports = router
