const db = require('../db')
const bcrypt = require('bcrypt')

const getUser = (id) => {
    return db
        .select("*")
        .from("users")
        .where("id", id)
        .first()
}

const getUsers = () => {
    return db
        .select("*")
        .from("users")
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

const saveUser = async(user) => {
    user.password = await hashPassword(user.password)
    return db
        .insert(user)
        .into('users')
        .returning(["username", "email"])
        .then(rows => {
            return rows[0]
        })
}

module.exports = {
    getUser,
    getUsers,
    saveUser
}