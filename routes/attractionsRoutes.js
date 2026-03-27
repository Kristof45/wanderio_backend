const express = require('express')
const { getattractions, getattractionsimg, createatt, updateatt, deleteatt } = require('../controllers/attractionController')

const router = express.Router()

router.get('/getatt', getattractions)
router.get('/getattimg', getattractionsimg)
router.post('/createatt', createatt)
router.put('/updateatt/:attractionID', updateatt)
router.delete('/deleteatt/:attractionID', deleteatt)

module.exports = router