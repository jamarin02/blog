const Validator = require('fastest-validator')

const v = new Validator()

const check = v.compile({
    username: { type: "string", min: 4, max: 255 },
    password: { type: "string", min: 4, max: 255 },
    email: { type: "email" }
})

module.exports = {
    check
}