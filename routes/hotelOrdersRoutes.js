const express = require('express')
const {gethotelord} = require('../controllers/hotelOrdersController')

const router = express.Router()

router.get('/gethotelord', gethotelord)

module.exports = router