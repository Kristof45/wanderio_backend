const express = require('express')
const {createairline, updateairline, deleteairline} = require('../controllers/airlinesController')

const router = express.Router()

router.post('/createairline', createairline)
router.put('/updateairline', updateairline)
router.delete('/deleteairline', deleteairline)

module.exports = router