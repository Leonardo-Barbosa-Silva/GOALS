const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes/routes')
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


console.log(port)

app.use(routes)






app.listen(port, () => console.log(`Server running on port ${port}...`))