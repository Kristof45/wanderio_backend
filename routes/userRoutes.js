const express = require('express')
const {alluser,register, login, logout, whoAmI, pswChange, nameChange, emailChange, modifyuser, deleteuser} = require('../controllers/userController')
const { auth } = require('../middleware/userMiddleware')
const { isAdmin } = require('../middleware/adminMiddleware')

const router = express.Router()

router.get('/admin/alluser',auth, isAdmin, alluser)
router.post('/register', register)
router.post('/login', login)
router.get('/whoami', auth, whoAmI)
router.post('/logout', auth, logout)
router.put('/pswchange', auth, pswChange)
router.put('/namechange', auth, nameChange)
router.put('/emailchange', auth, emailChange)
router.put('/admin/modifyuser/:userID', auth, modifyuser)
router.delete('/admin/deleteuser/:userID', auth, isAdmin, deleteuser)

module.exports = router