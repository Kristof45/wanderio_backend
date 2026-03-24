const express = require('express')
const {getticketorders, getticketorder, createticketorder, updateticketstatus, deleteticketorder} = require('../controllers/ticketOrdersController')

const router = express.Router()

router.get('/getticketorders', getticketorders)
router.get('/getticketorder', getticketorder)
router.post('/createticketorder', createticketorder)
router.put('/updateticketstatus/:orderID', updateticketstatus)
router.delete('/deleteticketorder/:orderID', deleteticketorder)

module.exports = router