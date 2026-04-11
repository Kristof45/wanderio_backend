const express = require('express')
const {auth} = require('../middleware/userMiddleware')
const {isAdmin} = require('../middleware/adminMiddleware')
const {getallflights, searchflight, updateflight, createflight, deleteflight, adgetflights} = require('../controllers/flightController')

const router = express.Router()

router.get('/getallflights', getallflights)
router.get('/searchflight', searchflight)
router.post('/createflight', createflight)
router.get('/adgetflights', auth, isAdmin, adgetflights)
router.put('/updateflight/:flightsId', auth, isAdmin, updateflight)
router.delete('/deleteflight/:flightsId', auth, isAdmin, deleteflight)


module.exports = router