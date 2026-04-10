const express = require('express')
const {auth} = require('../middleware/userMiddleware')
const {isAdmin} = require('../middleware/adminMiddleware')
const {getcities, createcity, updatecity, deletecity, getcitiesbyid, getcitydetails, uploadimage} = require('../controllers/cityController')

const multerMiddleware = require('../middleware/multerMiddleware')

const router = express.Router()

router.get('/getcities', getcities)
router.post('/createcity', createcity)
router.put('/updatecity/:cityID',auth,isAdmin, updatecity)
router.delete('/deletecity/:cityID',auth, isAdmin, deletecity)
router.get('/getcities/:cityID', getcitiesbyid)
router.get('/detail/:cityID', getcitydetails)
router.post('/upload-image/:cityID', auth, isAdmin, multerMiddleware.array("image", 5), uploadimage)

module.exports = router