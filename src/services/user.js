const db = require('../db')
const bcrypt = require('bcrypt')

const getUser = (id) => {
    return db
        .select("*")
        .from("users")
        .where("id", id)
        .first()
}

const getUserBy = (field, data) => {
    return db
        .select("*")
        .from("users")
        .where(field, data)
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

const userExists = async ({username, email}) => {
    return await getUserBy("username", username) !== undefined
        || await getUserBy("email", email) !== undefined
}

const saveUser = async(user) => {
    user.password = await hashPassword(user.password)

    if(await userExists(user)) {
        return {
            status: 409,
            data: 'User already exists'
        }
    }

    return {
        status: 200,
        data: await db
        .insert(user)
            .into('users')
            .returning(["username", "email"])
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = {
    getUser,
    getUserBy,
    getUsers,
    saveUser
}