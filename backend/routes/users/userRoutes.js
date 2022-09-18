const express = require('express')
const router = express.Router()

const auth = require('../../middlewares/auth')

const { registerUser, loginUser, getMe } = require('../../controllers/userControllers')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', auth, getMe)





module.exports = router