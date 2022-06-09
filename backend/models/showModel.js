const mongoose = require('mongoose')

const showSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title value']
    },
    image: {
        type: String,
        required: [true, 'Please provide an image']
    },
    score: {
        type: String,
    },
    progess: {
        type: String,
    },
    status: {
        type: String,
        required: [true, 'Please add movie status']
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('Show', showSchema)
