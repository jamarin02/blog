const express = require('express')
const PostController = require('../controllers/post')
const api = express.Router()

api.get('/post/:id', PostController.getPost)
api.get('/post', PostController.getPosts)
api.post('/post', PostController.savePost)
api.put('/post', PostController.updatePost)
api.delete('/post/:id', PostController.deletePost)

module.exports = api