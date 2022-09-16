const express = require('express')
const router = express.Router()

const { getGoals, setGoal, updateGoal, deleteGoal } = require('../../controllers/goalsController/goalsController')

router.get('/', getGoals)
router.post('/create', setGoal)
router.put('/update/:id', updateGoal)
router.delete('/delete/:id', deleteGoal)








module.exports = router