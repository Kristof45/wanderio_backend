const express = require('express')
const {getallflights, searchflight, updateflight, createflight, deleteflight} = require('../controllers/flightController')

const router = express.Router()

router.get('/getallflights', getallflights)
router.get('/searchflight', searchflight)
router.post('/createflight', createflight)
router.put('/updateflight/:flightsId', updateflight)
router.delete('/deleteflight/:flightsId', deleteflight)

module.exports = router