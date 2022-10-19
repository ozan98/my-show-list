const path = require('path')
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
app.use('/api/users/', require('./routes/userRoutes'))

// Serve frontend
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build'), {
        dotfiles: 'allow'
    }))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
}

// This middle ware will replace express error handler
app.use(errorHandler)


app.listen(port, () => console.log(`Server started on port:${port}`))