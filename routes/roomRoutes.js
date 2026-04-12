const express = require('express')
const {auth} = require('../middleware/userMiddleware')
const {isAdmin} = require('../middleware/adminMiddleware')
const {getrooms, createroom, updateroom, deleteroom, adgetroom, uploadimage} = require('../controllers/roomController')

const multerMiddleware = require('../middleware/multerMiddleware')

const router = express.Router()

router.get('/getrooms', getrooms)
router.post('/createroom', auth, isAdmin, createroom)
router.put('/updateroom/:roomId', auth, isAdmin, updateroom)
router.delete('/deleteroom/:roomId', auth, isAdmin, deleteroom)
router.get('/adgetroom', auth, isAdmin, adgetroom)
router.post('/upload-image/:roomId', auth, isAdmin, multerMiddleware.array("image", 5), uploadimage)


module.exports = router