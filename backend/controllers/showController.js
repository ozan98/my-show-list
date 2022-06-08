const asyncHandler = require('express-async-handler')

//@desc    Get all shows
//@route   GET /api/shows/
//@access  Private
const getShows = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'get shows'})
})

//@desc    Set shows
//@route   POST /api/shows/
//@access  Private
const setShows = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a new text field')
    }
    res.status(200).json({ message: 'set show'})
})

//@desc    Update shows
//@route   PUT /api/shows/:id
//@access  Private
const updateShow = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `updated show ${req.params.id}`})
})

//@desc    Delete shows
//@route   DELETE /api/shows/:id
//@access  Private
const deleteShow = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `deleted show ${req.params.id}`})
})

module.exports = {
    getShows,
    setShows,
    updateShow,
    deleteShow,
}


