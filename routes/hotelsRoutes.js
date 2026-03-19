const express = require('express')
const { gethotels, createhotel, updatehotel, deletehotel} = require('../controllers/hotelsController')

const router = express.Router()

router.get('/gethotels', gethotels)
router.post('/createhotel', createhotel)
router.put('/updatehotel/:hotelID', updatehotel)
router.delete('/deletehotel/:hotelID', deletehotel)

module.exports = router