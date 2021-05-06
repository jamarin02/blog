const Validator = require('fastest-validator')

const v = new Validator()

const check = v.compile({
    title: "string|min:4|max:255",
    excerpt: "string|min:4|max:255",
    content: "string|min:10",
    user_id: "number|min:1",
    draft: "boolean|optional"
})

module.exports = {
    check
}