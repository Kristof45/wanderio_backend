const express = require('express')
const {auth} = require('../middleware/userMiddleware')
const {isAdmin} = require('../middleware/adminMiddleware')
const {gethoteltypes, gethotels, createhotel, updatehotel, deletehotel, hoteldetails, uploadimage, getadhotel} = require('../controllers/hotelsController')

const multerMiddleware = require('../middleware/multerMiddleware')

const router = express.Router()

router.get('/gethoteltypes', gethoteltypes)
router.get('/gethotels', gethotels)
router.post('/createhotel', auth, isAdmin, multerMiddleware.array("image", 5), createhotel)
router.put('/updatehotel/:hotelID', auth, isAdmin, updatehotel)
router.delete('/deletehotel/:hotelID', auth, isAdmin, deletehotel)
router.get('/details/:hotelID', hoteldetails)
router.post('/upload-image/:hotelID', auth, isAdmin, multerMiddleware.array("image", 5), uploadimage)
router.get('/admin/getadhotel', auth, isAdmin, getadhotel)


module.exports = router