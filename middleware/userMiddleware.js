const jwt = require('jsonwebtoken')
const {config} = require('../config/dotenvConfig')

function auth(req, res, next) {
    const token = req.cookies?.[config.COOKIE_NAME]

    if (!token) {
        return res.status(401).json({errot: 'Nincs cookie'})
    }

    try {
        req.user = jwt.verify(token, config.JWT_SECRET)
        //console.log(req.user);
    } catch (err) {
        //console.log(err);
        return res.status(401).json({error: 'Ervenytelen token'})
    }
}

module.exports = {auth}