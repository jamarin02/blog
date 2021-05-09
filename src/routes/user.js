const express = require('express')
const UserController = require('../controllers/user')
const api = express.Router()
const jwt = require('../middleware/auth')

api.post('/login', UserController.login)
api.get('/user/:id', jwt.verifyAuthToken, UserController.getUser)
api.get('/user', jwt.verifyAuthToken, UserController.getUsers)
api.post('/user/', UserController.saveUser)
api.put('/user/', jwt.verifyAuthToken, UserController.updateUser)
api.delete('/user/:id', jwt.verifyAuthToken, UserController.deleteUser)

module.exports = api