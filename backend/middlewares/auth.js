const jwt = require('jsonwebtoken')
const Users = require('../models/usersModel')

const auth = async (req, res, next) => {
    // Assign the jwt passed on request header to a "BearerAuth" variable
    const BearerAuth = req.headers.authorization

    // Check if Bearer authorization exists
    if (!BearerAuth) {
        return res.status(401).json({ error: 'No token provided' })
    }

    // Split: Bearer <token>
    const parts = BearerAuth.split(' ')

    // Check Bearer and Token authorization
    if (!parts.length == 2) {
        return res.status(401).json({ error: 'Token error' })
    }

    // Bearer and Token
    const [ scheme, token ] = parts

    // Check format of Bearer authorization
    if (!(/^Bearer$/i).test(scheme)) {
        return res.status(401).json({ error: 'Token malformatted' })
    }

    // Verify jwt and if its valid assign the decoded JSON with user ID (payload) to a "decoded" variable
    jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token invalid'} )
        }
        
        req.user = await Users.findById(decoded.id).select('-password')

        next()
    })
}



module.exports = auth