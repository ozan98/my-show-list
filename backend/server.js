const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

// Configure express
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Configure express routes
app.use('/api/shows/', require('./routes/showRoutes'))


app.listen(port, () => console.log(`Server started on port:${port}`))