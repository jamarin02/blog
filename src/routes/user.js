const express = require('express')
const UserController = require('../controllers/user')
const api = express.Router()

api.get('/user/:id', UserController.getUser)
api.get('/user', UserController.getUsers)
api.post('/user/', UserController.saveUser)
api.put('/user/', UserController.updateUser)
api.delete('/user/:id', UserController.deleteUser)

module.exports = api