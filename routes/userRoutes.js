const express = require('express')
const {register, login, logout, whoAmI} = require('../controllers/userController')
const { auth } = require('../middleware/userMiddleware')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/whoami', auth, whoAmI)
router.post('/logout', auth, logout)

module.exports = router