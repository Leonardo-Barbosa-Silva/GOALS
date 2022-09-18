const express = require('express')
const router = express.Router()

const auth = require('../../middlewares/auth')

const { getGoals, setGoal, updateGoal, deleteGoal } = require('../../controllers/goalControllers')

router.get('/', auth, getGoals)
router.post('/create', auth, setGoal)
router.put('/update/:id', auth, updateGoal)
router.delete('/delete/:id', auth, deleteGoal)








module.exports = router