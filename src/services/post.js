const db = require('../db')

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

const savePost = async (post) => {
    return {
        status: 200,
        data: await db
            .insert(post)
            .into(tableName)
            .returning("title", "excerpt", "user_id")
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