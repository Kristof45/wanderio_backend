const express = require('express')
const {getairlines, createairline, updateairline, deleteairline} = require('../controllers/airlinesController')

const router = express.Router()

router.get('/getairlines', getairlines)
router.post('/createairline', createairline)
router.put('/updateairline', updateairline)
router.delete('/deleteairline', deleteairline)

module.exports = router