const express = require('express')
const {auth} = require('../middleware/userMiddleware')
const {isAdmin} = require('../middleware/adminMiddleware')
const { getattractions, getattractionsimg, createatt, updateatt, deleteatt,uploadimage } = require('../controllers/attractionController')

const multerMiddleware = require('../middleware/multerMiddleware')

const router = express.Router()

router.get('/getatt', getattractions)
router.get('/getattimg', getattractionsimg)
router.post('/createatt', createatt)
router.put('/updateatt/:attractionID',auth, isAdmin, updateatt)
router.delete('/deleteatt/:attractionID',auth, isAdmin, deleteatt)
router.post('/upload-image/:attractionID', auth, isAdmin, multerMiddleware.array("image", 5), uploadimage)


module.exports = router