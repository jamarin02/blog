require('dotenv').config()
const express = require('express')

const app = require('./app')
const port = process.env.PORT || 3000
const db = require('./db')

app.get('/', (req, res) => {
    let users = db.column('id').select().from('users')
    console.log(users)

    res.send('Welcome to blog API entrypoint! ^_^')
})

app.listen(port, () => {
    console.log(`Application listening at http://localhost:${port}`)
})