const { Router } = require('express')

// const { analysis } = require('../../modules/analytica/analytica')

const router = Router()

router.get('/personalData/:id', async(req, res) => {

    try {
        // const personalAnalysis = await analysis()
        // let genr = personalAnalysis.map(data => data.genr)
        
        res.status(200).json({
            message: 'Data has been loadaed',
            data: genr

        })

    } catch(err) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

module.exports = router