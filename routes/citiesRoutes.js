const express = require('express')
const {getcities, createcity, updatecity, deletecity, getcitiesbyid} = require('../controllers/cityController')

const router = express.Router()

router.get('/getcities', getcities)
router.post('/createcity', createcity)
router.put('/updatecity/:cityID', updatecity)
router.delete('/deletecity/:cityID', deletecity)
router.get('/getcities/:cityID', getcitiesbyid)

module.exports = router