const express = require('express')
const {auth} = require('../middleware/userMiddleware')
const {isAdmin} = require('../middleware/adminMiddleware')
const {gethoteltypes, gethotels, createhotel, updatehotel, deletehotel} = require('../controllers/hotelsController')

const router = express.Router()

router.get('/gethoteltypes', gethoteltypes)
router.get('/gethotels', gethotels)
router.post('/createhotel', auth, isAdmin, createhotel)
router.put('/updatehotel/:hotelID', auth, isAdmin, updatehotel)
router.delete('/deletehotel/:hotelID', auth, isAdmin, deletehotel)

module.exports = router