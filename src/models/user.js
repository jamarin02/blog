const Validator = require('fastest-validator')

const v = new Validator()

const check = v.compile({
    username: "string|min:4|max:255",
    password: "string|min:4|max:255",
    email: "email",
    active: "boolean|optional"
})

module.exports = {
    check
}