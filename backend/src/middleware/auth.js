const jwt = require('jsonwebtoken')
const User = require('../models/Users')
const Partner = require('../models/Partner')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')

        const decoded = jwt.verify(token, 'hirensavani')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) || await Partner.findOne({ _id: decoded._id, 'tokens.token': token })


        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'please authenticate.' })
    }
}

module.exports = auth