import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import multer from 'multer'

import { routes } from './api/index'

import { PORT, mongoURL } from './config/config'
import { posterConfig } from './config/multer'

const app = express()

app.use(multer({ storage: posterConfig }).single('file'));
app.use('/static', express.static('public'))
app.use('/static', express.static('video'))
app.use(express.json())
app.use(bodyParser.json())
app.use(routes())

const run = async () => {
    try {
        await mongoose.connect(mongoURL), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
        app.listen(PORT, () => console.log(`Server on port ${PORT}`))
        // console.log(mongoose.connection.db.listCollections().toArray((err, names) => {
        //     if(err) {
        //         console.log(err)
        //     } else {
        //         console.log(names)
        //     } 

        // }))
    } catch (err) {
        console.log('DB Crashed')
        console.log(err)
    }
}

run()

