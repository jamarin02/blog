const getPost = (req, res) => {
    const id = req.params.id
    res.status(200).send({
        data: id
    })
}

const getPosts = (req, res) => {
    res.status(200).send({
        data: 'posts'
    })
}

const savePost = (req, res) => {
    const params = req.body
    res.status(200).send({
        post: params
    })
}

const updatePost = (req, res) => {
    const params = req.body
    res.status(200).send({
        post: params
    })
}

const deletePost = (req, res) => {
    const id = req.params.id
    res.status(200).send({
        data: id
    })
}

module.exports = {
    getPost,
    getPosts,
    savePost,
    updatePost,
    deletePost
}