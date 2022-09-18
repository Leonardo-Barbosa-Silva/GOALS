const Goals = require('../../models/goalsModel')
const Users = require('../../models/usersModel')

module.exports = {

    // @desc    GET goals
    // @route   GET  /v1/api/goals
    // @acess   Private
    getGoals: async(req, res, next) => {
        const goals = await Goals.find({ user: req.user.id })

        res.status(200).json({ message: 'Successfully get goals', items: goals })
    },

    // @desc    CREATE goal
    // @route   POST  /v1/api/goals/create
    // @acess   Private
    setGoal: async(req, res, next) => {
        if (!req.body.text) {
            return res.status(400).json({ error: 'Please add some text field' })
        }

        const createdGoal = await Goals.create({
            user: req.user.id,
            text: req.body.text
        })

        res.status(201).json({ message: 'Sucessfully create goal', item: createdGoal })
    },

    // @desc    UPDATE goal
    // @route   PUT  /v1/api/goals/update/:id
    // @acess   Private
    updateGoal: async(req, res, next) => {
        const id = req.params.id

        const goal = await Goals.findById(id)

        if (!goal) {
            return res.status(400).json({ error: 'Goal not found by ID' })
        }

        const user = await Users.findById(req.user.id)

        if (!user) {
            return res.status(400).json({ error: 'User not found please try to Sign In again!' })
        }

        if (goal.user.toString() !== user.id) {
            return res.status(401).json({ error: 'User not authorized to update this goal' })
        }

        const updatedGoal = await Goals.findByIdAndUpdate(id, req.body, { new: true })

        res.status(201).json({ message: 'Successfully update goal', item: updatedGoal })
    },

    // @desc    DELETE goal
    // @route   DELETE  /v1/api/goals/delete/:id
    // @acess   Private
    deleteGoal: async(req, res, next) => {
        const id = req.params.id

        const goal = await Goals.findById(id)

        if (!goal) {
            return res.status(400).json({ error: 'Goal not found by ID' })
        }

        const user = await Users.findById(req.user.id)

        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }

        if (goal.user.toString() !== user.id) {
            return res.status(401).json({ error: 'User not authorized to update this goal' })
        }

        const deletedGoal = await Goals.findByIdAndDelete(id)
        
        res.status(201).json({ message: 'Successfully delete goal', item: deletedGoal })
    },
}