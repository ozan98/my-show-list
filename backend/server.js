const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

// Configure express
app.use(express.json())
// Accepting body data
app.use(express.urlencoded({ extended: false }))

// Configure express routes
app.use('/api/shows/', require('./routes/showRoutes'))

// This middle ware will replace express error handler
app.use(errorHandler)


app.listen(port, () => console.log(`Server started on port:${port}`))