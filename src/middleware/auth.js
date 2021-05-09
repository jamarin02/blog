const jwt = require('jsonwebtoken')

const authTokenSecret = process.env.AUTH_TOKEN_SECRET
const authTokenExpirationTime = process.env.AUTH_TOKEN_EXPIRATION_TIME
const refreshTokenSecret = process.env.REFERSH_TOKEN_SECRET
const refreshTokenExpirationTime = process.env.REFRESH_TOKEN_EXPIRATION_TIME

const generateAuthToken = ({id, email}) => {
    try {
        return jwt.sign({id, email}, authTokenSecret, {expiresIn: authTokenExpirationTime})
    }
    catch(err) {
        console.error(err)
        return undefined
    }
}

const verifyAuthToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token === null || token === undefined) return res.sendStatus(401)

    jwt.verify(token, authTokenSecret, (err, user) => {
        console.error(err)
        if(err || user === undefined) return res.sendStatus(403)

        req.id = user.id
        req.email = user.email

        next()
    })
}

module.exports = {
    generateAuthToken,
    verifyAuthToken
}