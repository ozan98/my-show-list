const asyncHandler = require('express-async-handler')

const Show = require('../models/showModel')

//@desc    Get all shows
//@route   GET /api/shows/
//@access  Private
const getShows = asyncHandler(async (req, res) => {
    const shows = await Show.find({})

    res.status(200).json(shows)
})

//@desc    Set shows
//@route   POST /api/shows/
//@access  Private
const setShows = asyncHandler(async (req, res) => {
    if(!req.body.title || !req.body.image || !req.body.mediaType || !req.body.score || !req.body.status){
        res.status(400)
        throw new Error('Please add a new text field')
    }

    const show = await Show.create({
        title: req.body.title,
        image: req.body.image,
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

    await show.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getShows,
    setShows,
    updateShow,
    deleteShow,
}


