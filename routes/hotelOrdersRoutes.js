const express = require('express')
const {gethotelord, createhotelord, updatehotordstat, deletehotelord} = require('../controllers/hotelOrdersController')

const router = express.Router()

router.get('/gethotelord', gethotelord)
router.post('/createhotelord', createhotelord)
router.put('/updatehotordstat/:orderID', updatehotordstat)
router.delete('/deletehotelord/:orderID', deletehotelord)

module.exports = router