const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Users = require('../../models/usersModel')

// Generate token
const generateToken = (userID) => {
    return jwt.sign({ id: userID }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

module.exports = {

    // @desc    Register a new user
    // @route   POST  /v1/api/user/register
    // @acess   Public
    registerUser: async(req, res, next) => {
        const { name, email, password } = req.body

        if (!name) {
            return res.status(400).json({ error: 'Please add a name' })
        } else if (!email) {
            return res.status(400).json({ error: 'Please add a email' })
        } else if (!password) {
            return res.status(400).json({ error: 'Please add a password' })
        }

        // Check if the user already exists
        const userExists = await Users.findOne({ email })

        if (userExists) {
            return res.status(400).json({ error: 'User already exists' })
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10)

        // Create user
        const userCreated = await Users.create({ name, email, password: hashPassword })

        if (userCreated) {
            res.status(201).json({ message: 'Successfully create user', item: {
                _id: userCreated.id,
                name: userCreated.name,
                email: userCreated.email,
                token: generateToken(userCreated._id)
            }})
        } else {
            return res.status(400).json({ error: 'Invalid user data' })
        }

    },

    // @desc    Authenticate user
    // @route   POST  /v1/api/user/login
    // @acess   Public
    loginUser: async(req, res, next) => {
        const { email, password } = req.body

        const user = await Users.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({ message: 'Successfully login user', item: {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            }})
        } else {
            return res.status(400).json({ error: 'email or password incorrect' })
        }
    },

    // @desc    Get user data
    // @route   GET  /v1/api/user/me
    // @acess   Private
    getMe: async(req, res, next) => {
        res.status(200).json({ item: req.user })
    }
}