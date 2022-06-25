const asyncHandler = require('express-async-handler')

const Show = require('../models/showModel')

//@desc    Get all shows
//@route   GET /api/shows/
//@access  Private
const getShows = asyncHandler(async (req, res) => {
    const shows = await Show.find({ user: req.user.id})

    res.status(200).json(shows)
})

//@desc    Set shows
//@route   POST /api/shows/
//@access  Private
const setShows = asyncHandler(async (req, res) => {
    const { title, imagePath, mediaType, score, status } = req.body
    if(!title || !imagePath || !mediaType || !score || !status){
        res.status(400)
        throw new Error('Please add a new text field')
    }

    // Check if title already exist in db
    const titleExist = await Show.findOne({ title })

    if(titleExist) {
        res.status(400)
        throw new Error('Show already exist')
    }

    const show = await Show.create({
        user: req.user,
        title: req.body.title,
        imagePath: req.body.imagePath,
        mediaType: req.body.mediaType,
        score: req.body.score,
        status: req.body.status
    })
    

    res.status(200).json(show)
})

//@desc    Update shows
//@route   PUT /api/shows/:id
//@access  Private
const updateShow = asyncHandler(async (req, res) => {
    const show = await Show.findById(req.params.id)

    if(!show) {
        res.status(400)
        throw new Error('Show not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Checking if logged in user mateched with the user in corrosponding show
    if(req.user.id !== show.user.toString()) {
        req.status(401)
        throw new Error('User not authorized')
    }

    const updatedShow = await Show.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
    res.status(200).json(updatedShow)
})

//@desc    Delete shows
//@route   DELETE /api/shows/:id
//@access  Private
const deleteShow = asyncHandler(async (req, res) => {
    const show = await Show.findById(req.params.id)

    if(!show) {
        res.status(400)
        throw new Error('Show not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Checking if logged in user mateched with the user in corrosponding show
    if(req.user.id !== show.user.toString()) {
        req.status(401)
        throw new Error('User not authorized')
    }

    await show.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getShows,
    setShows,
    updateShow,
    deleteShow,
}


