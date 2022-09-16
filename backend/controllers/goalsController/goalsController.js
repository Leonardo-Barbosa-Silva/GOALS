module.exports = {

    // @desc    GET goals
    // @route   GET  /v1/api/goals
    // @acess   Private
    getGoals: async(req, res, next) => {
        res.status(200).json({ message: 'GET Goals' })
    },

    // @desc    CREATE goal
    // @route   POST  /v1/api/goals/create
    // @acess   Private
    setGoal: async(req, res, next) => {
        res.status(201).json({ message: 'POST Goal' })
    },

    // @desc    UPDATE goal
    // @route   PUT  /v1/api/goals/update/:id
    // @acess   Private
    updateGoal: async(req, res, next) => {
        res.status(201).json({ message: `PUT Goal ${req.params.id}` })
    },

    // @desc    DELETE goal
    // @route   DELETE  /v1/api/goals/delete/:id
    // @acess   Private
    deleteGoal: async(req, res, next) => {
        res.status(201).json({ message: `DELETE Goal ${req.params.id}` })
    },
}