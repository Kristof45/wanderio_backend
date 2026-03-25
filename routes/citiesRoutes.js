const express = require('express')
const {getcities, createcity, updatecity, deletecity} = require('../controllers/cityController')

const router = express.Router()

router.get('/getcities', getcities)
router.post('/createcity', createcity)
router.put('/updatecity/:cityID', updatecity)
router.delete('/deletecity/:cityID', deletecity)

module.exports = router