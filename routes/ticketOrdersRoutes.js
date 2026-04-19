const express = require('express')
const {auth} = require('../middleware/userMiddleware') 
const {isAdmin} = require('../middleware/adminMiddleware')
const {getticketorders, getticketorder, createticketorder, updateticketstatus, deleteticketorder} = require('../controllers/ticketOrdersController')

const router = express.Router()

router.get('/getticketorders', getticketorders)
router.get('/getticketorder', getticketorder)
router.post('/createticketorder', createticketorder)
router.put('/updateticketstatus/:orderID', auth, isAdmin, updateticketstatus)
router.delete('/deleteticketorder/:orderID', auth, deleteticketorder)

module.exports = router