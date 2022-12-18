const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const connectionDB = require('./config/db')()
const routes = require('./routes/routes')
const port = process.env.PORT || 5000
const colors = require('colors')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routes)

app.use(errorHandler)






app.listen(port, () => console.log(`Server running on port ${port}...`.cyan.underline))