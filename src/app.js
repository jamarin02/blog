const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const post = require('./routes/post')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(post)

module.exports = app