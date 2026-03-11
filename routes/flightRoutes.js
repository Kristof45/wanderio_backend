const express = require('express')
const {getallflights, searchflight} = require('../controllers/flightController')

const router = express.Router()

router.get('/getallflights', getallflights)
router.get('/searchflight', searchflight)

module.exports = router