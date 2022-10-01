const jwt = require('jsonwebtoken')
const Users = require('../models/usersModel')

const auth = async (req, res, next) => {
    // Assign jwt of the request headers authorization to a variable
    const BearerAuth = req.headers.authorization

    // Check if authorization exists
    if (!BearerAuth) {
        return res.status(401).json({ error: 'No token provided' })
    }

    // Split authorization format: Bearer <token>
    const parts = BearerAuth.split(' ')

    // Check Bearer and Token authorization
    if (!parts.length == 2) {
        return res.status(401).json({ error: 'Token error' })
    }

    // Assign Bearer and Token to a different variables (array destructuring)
    const [ scheme, token ] = parts

    // Check the right format of Bearer
    if (!(/^Bearer$/i).test(scheme)) {
        return res.status(401).json({ error: 'Token malformatted' })
    }

    // Verify jwt and if its valid the callback will provide the decoded payload JSON with user ID
    jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token invalid' })
        }
        
        // Create a new attribute "user" in req with user data found by id on payload jwt
        req.user = await Users.findById(decoded.id).select('-password')

        // Call the next middleware
        next()
    })
}



module.exports = auth