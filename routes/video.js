const { Router } = require('express')
const fs = require('fs')
const kill  = require('tree-kill')
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg')
const ffmpeg = require('fluent-ffmpeg')
const Transcoder = require('stream-transcoder')
const cmd = require('node-cmd')
const exec = require('child_process').spawn
const events = require('events')
const eventEmitter = new events.EventEmitter()


const router = Router()
const command = ffmpeg();

ffmpeg.setFfmpegPath(ffmpegInstaller.path)


router.post('/video', async(req, res) => {

    const { name } = req.body


    console.log(name)

    ffmpeg.ffprobe(`F:/${name}`, (err, metadata) => {
        return res.json(metadata)
    })
})

router.post('/video/getAudio', async(req, res) => {

    const { name, streamNum, language } = req.body

    const fileNameOutput = name.replace(/\.mkv$/i, '')

    const command = ffmpeg()
    .input(`F:/${name}`)
    .outputOptions([
        `-map 0:${streamNum}`, '-ac 2', '-ab 192k', '-vn', '-sn'
    ])
    .output(`f:/convertedH264/${fileNameOutput}_${language}.aac`)
    .on('start', function(commandLine) {
        console.log('Spawned Ffmpeg with command: ' + commandLine);
    })
    .on('error', function(err, stdout, stderr) {
        console.log('Cannot process video: ' + err.message);
        return res.json({status: 'ERROR'})
    })
    .on('progress', function(progress) {
        console.log('Processing: ' + progress.percent);  
    })
    .on('end', function() {
        console.log('Finished processing');
        return res.json({status: 'END'})
    })
    .run()   
})

router.post('/video/getVideo', async(req, res) => {
    const { name, bitrate, control, fps } = req.body
    
    const fileNameOutput = name.replace(/\.mkv$/i, '')
    
        const child = exec("F:\\x264.exe" , 
        [
            '--output', `f:/ConvertedH264/${fileNameOutput}_${bitrate}.264`,
            '--fps', `${fps}`,
            '--bitrate', `${bitrate}`, 
            '--vbv-maxrate', '6800', 
            '--vbv-bufsize', '13600',
            '--min-keyint', '48',
            '--keyint', '48',
            '--no-scenecut',
            '--pass', '1',    
            `f:/${name}`,
        ])

        child.stderr.on("data", data => {
            console.log(data.toString())
        })
        
        child.stdout.on("data", data => {
            process.stdout.write("Downloading " + data + " bytes\n");
        })

        eventEmitter.on('kill', () => {
            kill(child.pid)
            return res.end()
        })

        eventEmitter.emit(control) 
})


module.exports = router
