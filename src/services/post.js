const db = require('../db')
const UserService = require('./user')

const tableName = 'posts'

const getPost = (id) => {
    return db
        .select("*")
        .from(tableName)
        .where("id", id)
        .first()
}

const getPostBy = (field, data) => {
    return db
        .select("*")
        .from(tableName)
        .where(field, data)
        .first()
}

const getPosts = () => {
    return db
        .select("*")
        .from(tableName)
}

const checkUserExists = async (userId) => {
    return await UserService.getUser(userId) !== undefined
}

const savePost = async (post) => {
    if(!await checkUserExists(post.user_id)) {
        return {
            status: 409,
            data: 'User must exists.'
        }
    }

    return {
        status: 200,
        data: await db
            .insert(post)
            .into(tableName)
            .returning(["title", "excerpt", "user_id"])
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = {
    getPost,
    getPostBy,
    getPosts,
    savePost
}