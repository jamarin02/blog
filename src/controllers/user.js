const UserService = require('../services/user')
const User = require('../models/user')
const jwt = require('../middleware/auth')

const login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if(email === undefined || password === undefined) return res.send(400)

    const user = await UserService.login(email, password)

    if(user === undefined) return res.sendStatus(404)

    return res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        authToken: jwt.generateAuthToken(user)
    })
}

const getUser = async (req, res) => {
    const id = req.params.id

    if(id <= 0) {
        res.status(400).send({
            data: 'Id must be greater than 0'
        })
    }

    const user = await UserService.getUser(id)
    if(user !== null && user !== undefined) {
        res.status(200).send({
            data: user
        })
    } else {
        res.status(404).send({
            data: {}
        })
    }

}

const getUsers = async (req, res) => {
    const users = await UserService.getUsers()
    res.status(200).send({
        data: users
    })
}

const saveUser = async (req, res) => {
    const params = req.body
    const userCheck = User.check(params)
    if(userCheck !== true) {
        return res.status(400).send({
          data: userCheck
        })
    }
    const user = await UserService.saveUser(params)
    if(user.status !== 200) {
        return res.status(user.status).send({
            data: user.data
        })
    }
    else if(user.status === 200) {
        return res.status(user.status).send({
            data: user.data
        })
    } else {
        return res.status(500).send({
            data: {}
        })
    }
}

const updateUser = (req, res) => {
    const params = req.body
    return res.status(200).send({
        post: params
    })
}

const deleteUser = (req, res) => {
    const id = req.params.id
    return res.status(200).send({
        data: id
    })
}

module.exports = {
    login,
    getUser,
    getUsers,
    saveUser,
    updateUser,
    deleteUser
}