const express = require('express')
const {auth} = require('../middleware/userMiddleware')
const {isAdmin} = require('../middleware/adminMiddleware')
const {getrooms, createroom, updateroom, deleteroom, adgetroom} = require('../controllers/roomController')

const router = express.Router()

router.get('/getrooms', getrooms)
router.post('/createroom', auth, isAdmin, createroom)
router.put('/updateroom', auth, isAdmin, updateroom)
router.delete('/deleteroom', auth, isAdmin, deleteroom)
router.get('/adgetroom', auth, isAdmin, adgetroom)

module.exports = router