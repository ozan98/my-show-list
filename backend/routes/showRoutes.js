const express = require('express')
router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {getShows, setShows, updateShow, deleteShow} = require('../controllers/showController')

router.route('/').get(protect, getShows).post(protect, setShows)
router.route('/:id').put(protect, updateShow).delete(protect, deleteShow)


module.exports = router