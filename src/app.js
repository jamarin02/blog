const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const post = require('./routes/post')
const user = require('./routes/user')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(user)
app.use(post)

module.exports = app