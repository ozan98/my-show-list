const mongoose = require('mongoose')

const showSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title value']
    },
    image: {
        type: String,
        required: [true, 'Please provide an image']
    },
    mediaType: {
        type: String,
        require: [true, 'Please provide a media type']
    },
    score: {
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
