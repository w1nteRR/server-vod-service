import { diskStorage } from 'multer'

export const posterConfig = diskStorage({
    destination: (req, file, cb) => {
        let filmId = req.url.slice(-24)
        cb(null, `public/${filmId}`)
    },
    filename: (req, file, cb) =>{
        cb(null, 'poster.jpg')
    }
})
