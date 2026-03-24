const express = require('express')
const {getairlines, createairline, updateairline, deleteairline} = require('../controllers/airlinesController')

const router = express.Router()

router.get('/getairlines', getairlines)
router.post('/createairline', createairline)
router.put('/updateairline/:airlineID', updateairline)
router.delete('/deleteairline/:airlineID', deleteairline)

module.exports = router