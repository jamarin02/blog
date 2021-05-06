const PostService = require('../services/post')
const Post = require('../models/post')

const getPost = async (req, res) => {
    const id = req.params.id

    if(id <= 0) {
        res.status(400).send({
            data: 'Id must be greater than 0'
        })
    }

    const post = await PostService.getPost(id)

    if(post !== null && post !== undefined) {
        res.status(200).send({
            data: post
        })
    } else {
        res.status(404).send({
            data: {}
        })
    }
}

const getPosts = async (req, res) => {
    const posts = await PostService.getPosts()
    res.status(200).send({
        data: posts
    })
}

const savePost = async (req, res) => {
    const params = req.body
    const postCheck = Post.check(params)

    if(postCheck !== true) {
        return res.status(400).send({
          data: postCheck
        })
    }

    const post = await PostService.savePost(params)
    if(post.status !== 200) {
        return res.status(post.status).send({
          data: post.data
        })
    } else if(post.status === 200) {
        return res.status(post.status).send({
            data: post.data
        })
    } else {
        return res.status(500).send({
            data: {}
        })
    }
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