const express = require('express')
const {alluser,register, login, logout, whoAmI, pswChange, nameChange, emailChange} = require('../controllers/userController')
const { auth } = require('../middleware/userMiddleware')

const router = express.Router()

router.get('/alluser', alluser)
router.post('/register', register)
router.post('/login', login)
router.get('/whoami', auth, whoAmI)
router.post('/logout', auth, logout)
router.put('/pswchange', auth, pswChange)
router.put('/namechange', auth, nameChange)
router.put('/emailchange', auth, emailChange)

module.exports = router