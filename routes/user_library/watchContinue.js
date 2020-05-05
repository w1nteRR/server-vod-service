const { Router } = require('express')
const mongoose = require('mongoose')
const UserPlaylist = require('../../models/UserPlaylist')
// const Film = require('../../models/Film')
const router = Router()

router.put('/watch_continue/create', async(req, res) => {
    const { filmId, userId, time, filmImg } = req.body

    console.log(req.body)

    const obj = {
        _id: mongoose.Types.ObjectId(filmId),
        time,
        img: filmImg 
    }

    // console.log(obj)
    
    try {

        await UserPlaylist.updateOne(
            { 
                userId: mongoose.Types.ObjectId(userId)
            }, 
            {
                watchContinue: obj
            }
        )

        res.status(200).json({
            message: `has been created`
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

// router.put('/playlists/remove', async(req, res) => {
//     const { userId, playlistId } = req.body
    
//     try {
//         const d = await UserPlaylist.updateOne(
//             { 
//                 userId: mongoose.Types.ObjectId(userId),
//                 'playlists.id': mongoose.Types.ObjectId(playlistId)
//             }, 
//             { $pull: {'playlists': {id: mongoose.Types.ObjectId(playlistId)} }
//         })

//         res.status(200).json({
//             message: `${playlistId} removed`
//         })

//     } catch (err) {
//         res.status(400).json({
//             message: 'Something went wrong'
//         })
//     }
// })

router.get('/watch_continue/:id', async(req, res) => {
    try {
        const userLibrary = await UserPlaylist.findOne({
            userId: mongoose.Types.ObjectId(req.params.id)
        })
        res.json(userLibrary.watchContinue)

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

// router.post('/playlist/single', async(req, res) => {
//     const { playlistId, userId } = req.body
//     try {
      
//         const playlist = await UserPlaylist.findOne(
//             {
//                 userId: mongoose.Types.ObjectId(userId),
//                 'playlists.id': mongoose.Types.ObjectId(playlistId)
//             }, 
//             { 
//                 'playlists.$.films': mongoose.Types.ObjectId(playlistId)
//             })

//         res.status(200).json(playlist.playlists[0].films)
        
//     } catch (err) {
//         res.status(400).json({
//             message: 'Something went wrong'
//         })
//     }
// })

// router.put('/playlists/edit', async(req, res) => {
//     const { playlistId, userId, name } = req.body
    
//     try {
//         const changeName = await UserPlaylist.updateOne(
//             { 
//                 userId: mongoose.Types.ObjectId(userId),
//                 'playlists.id': mongoose.Types.ObjectId(playlistId)
//             }, 
//             { $set: {'playlists.$.playlistName': name }
//         })

//         res.status(200).json(changeName.ok)

//     } catch (err) {
//         res.status(400).json({
//             message: 'Something went wrong'
//         })
//     }
// })

// router.put('/playlists/add', async(req, res) => {
//     const { filmId, userId, playlistId, filmImg } = req.body

//     try {
//         const playlist = await UserPlaylist.findOne({
//             userId: mongoose.Types.ObjectId(userId),
//             playlists: {
//                 $elemMatch: {
//                     id: mongoose.Types.ObjectId(playlistId),
//                     films: {
//                         $elemMatch: {
//                             _id: mongoose.Types.ObjectId(filmId)}
//                         }
//                     }
//                 }
//             })

//         if(playlist) {
//             return res.status(404).json({
//                 message: 'Film in playlist already'
//             })
//         }

//         await UserPlaylist.updateOne(
//             { 
//                 userId: mongoose.Types.ObjectId(userId),
//                 'playlists.id': mongoose.Types.ObjectId(playlistId)
//             }, 
//             { $push: {'playlists.$.films': {
//                 _id: mongoose.Types.ObjectId(filmId),
//                 img: filmImg
//             }}
//         })

//         res.status(200).json({
//             message: 'ok'
//         })

//     } catch (err) {
//         res.status(400).json({
//             message: 'Something went wrong'
//         })
//     }
// })

module.exports = router