const express = require('express')
const router = express.Router()

const goalRoutes = require('./goals/goalRoutes')
const userRoutes = require('./users/userRoutes')




router.use('/v1/api/goals', goalRoutes)
//router.use('/v1/api/users', userRoutes)










module.exports = router