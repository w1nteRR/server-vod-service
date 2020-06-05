import express from 'express'
import mongoose from 'mongoose'

import { PORT, mongoURL } from './config/config'

const app = express()

app.use('/static', express.static('public'))
app.use('/static', express.static('video'))
app.use(express.json())

const run = async () => {
    try {
        await mongoose.connect(mongoURL), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
        app.listen(PORT, () => console.log(`Server on port ${PORT}`))
    } catch (err) {
        console.log('DB Crashed')
        console.log(err)
    }
}

run()

// const storageConfig = multer.diskStorage({
//     destination: (req: Request, file, cb: Response) => {
//         console.log(req.path)
//         const str = req.path.replace('/api/film/', '')
//         const b = str.replace('/image', '')
        
//         cb(null, `public/${b}`)
//     },
//     filename: (req: Request, file, cb: Response) =>{
//         cb(null, file.originalname)
//     }
// })

