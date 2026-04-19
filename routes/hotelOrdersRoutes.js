const express = require('express')
const {auth} = require('../middleware/userMiddleware')
const {isAdmin} = require('../middleware/adminMiddleware')
const {gethotelord, createhotelord, updatehotordstat, deletehotelord} = require('../controllers/hotelOrdersController')

const router = express.Router()

router.get('/gethotelord', gethotelord)
router.post('/createhotelord', createhotelord)
router.put('/updatehotordstat/:orderID', auth, isAdmin, updatehotordstat)
router.delete('/deletehotelord/:orderID', auth, deletehotelord)

module.exports = router