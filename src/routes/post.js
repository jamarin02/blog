const express = require('express')
const PostController = require('../controllers/post')
const api = express.Router()
const jwt = require('../middleware/auth')

api.get('/post/:id', PostController.getPost)
api.get('/post', PostController.getPosts)
api.post('/post', jwt.verifyAuthToken(), PostController.savePost)
api.put('/post', jwt.verifyAuthToken(), PostController.updatePost)
api.delete('/post/:id', jwt.verifyAuthToken(), PostController.deletePost)

module.exports = api