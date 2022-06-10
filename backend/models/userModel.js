const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide a user name'],
    },
    email: {
        type: String,
        require: [true, 'please provide an email'],
        uniqur: true,
    },
    password: {
        type: String,
        required: [true, 'please provide a password']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)