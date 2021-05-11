const db = require('../db')
const bcrypt = require('bcrypt')

const login = async (email, password) => {
    const user = await db
        .select(["id", "username", "email", "password"])
        .from("users")
        .where("email", email)
        .first()

    if(user === undefined) return undefined;

    if(bcrypt.compare(user.password, password)) return {id: user.id, email: user.email, username: user.username}
    return undefined;
}

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
    return await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
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
    login,
    getUser,
    getUserBy,
    getUsers,
    saveUser
}