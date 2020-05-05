const { Router } = require('express')
const mongoose = require('mongoose')
const UserPlaylist = require('../../models/UserPlaylist')
const Film = require('../../models/Film')
const router = Router()

// router.put('/playlists/create', async(req, res) => {
//     const { name, filmId } = req.body

//     const playlist = {
//         playlistName: name,
//         films: [] 
//     }
    
//     try {
//         const playlistsList = await UserPlaylist.aggregate([
//             {
//                 $match: {
//                     userId: mongoose.Types.ObjectId(userId),
//                     // playlists: mongoose.Types.ObjectId(filmId)
//                 }
//             }
//         ])

//         if(playlistsList.length) {
//             return res.status(404).json({
//                 message: `${filmId} already added`
//             })
//         }

//         await UserPlaylist.updateOne(
//             { 
//                 userId: mongoose.Types.ObjectId(userId)
//             }, 
//             { $push: {'playlists': playlist }
//         })

//         res.status(200).json({
//             message: `Playlist ${name} has been created`
//         })

//     } catch (err) {
//         res.status(400).json({
//             message: 'Something went wrong'
//         })
//     }
// })

// router.put('/liked/remove', async(req, res) => {
//     const { userId, filmId } = req.body
    
//     try {
//         await UserPlaylist.updateOne(
//             { 
//                 userId: mongoose.Types.ObjectId(userId)
//             }, 
//             { $pull: {'liked': mongoose.Types.ObjectId(filmId) }
//         })

//         res.status(200).json({
//             message: `${filmId} removed`
//         })

//     } catch (err) {
//         res.status(400).json({
//             message: 'Something went wrong'
//         })
//     }
// })

// router.get('/liked/:id', async(req, res) => {
    
//     try {
//         const likedList = await UserPlaylist.findOne({ userId: mongoose.Types.ObjectId(req.params.id)})
//         const likedMaped = likedList.liked.map(film => film)

//         const likedListFilms = await Film.find({
//             _id: {$in: likedMaped},
//         })
          
//         const likedListReady = likedListFilms.map(opt => ({
//             name: opt.name,
//             _id: opt._id,
//             img: opt.img
//         }))
        
//         res.json(likedListReady)

//     } catch (err) {
//         res.status(400).json({
//             message: 'Something went wrong'
//         })
//     }
// })

// router.post('/like_status', async(req, res) => {

//     const { filmId, userId } = req.body

//     try {
//         const likedList = await UserPlaylist.aggregate([
//             {
//                 $match: {
//                     userId: mongoose.Types.ObjectId(userId),
//                     liked: mongoose.Types.ObjectId(filmId)
//                 }
//             }
//         ])

//         if(likedList.length) {
//             res.json(true)
//         } else {
//             res.json(false)
//         }

//     } catch (err) {
//         res.status(400).json({
//             message: 'Something went wrong'
//         })
//     }
// })


module.exports = router