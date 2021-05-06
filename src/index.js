require('dotenv').config()

const app = require('./app')
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Welcome to blog API entrypoint! ^_^')
})

app.listen(port, () => {
    console.log(`Application listening at http://localhost:${port}`)
})