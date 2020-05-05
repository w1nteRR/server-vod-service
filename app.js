const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const multer = require('multer')
const cookieParser = require('cookie-parser')

const app = express()

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.path)
        const str = req.path.replace('/api/film/', '')
        const b = str.replace('/image', '')
        
        cb(null, `public/${b}`);
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

app.use(multer({ storage: storageConfig }).single('file'));
app.use(cookieParser('sddw'))
app.use('/static', express.static('public'))
app.use('/static', express.static('video'))
app.use(express.json({ extented: true }))

app.use('/', require('./routes/auth'))
app.use('/', require('./routes/film'))
app.use('/', require('./routes/actor'))
app.use('/', require('./routes/users'))
app.use('/', require('./routes/video'))
app.use('/', require('./routes/search'))
app.use('/', require('./routes/playlist'))
app.use('/', require('./routes/user'))
app.use('/', require('./routes/rating'))

app.use('/library', require('./routes/user_library/liked'))
app.use('/library', require('./routes/user_library/playlists'))
app.use('/library', require('./routes/user_library/watchLater'))
app.use('/library', require('./routes/user_library/watchContinue'))

app.use('/activities', require('./routes/activities/history'))

app.use('/omdb', require('./routes/omdbAPI/omdb'))
app.use('/analytica', require('./routes/analytica/personalData'))

const PORT = config.get('port') || 8000

const run = async () => {
    try {
        await mongoose.connect(config.get('dbUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(8000, PORT, () => console.log(`Server on port ${PORT}`))

       
    } catch(err) {
        console.log('DB Crashed')
        process.exit(1)
    }
}


run()


