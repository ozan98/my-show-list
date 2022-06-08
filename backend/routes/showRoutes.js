const express = require('express')
router = express.Router()
const {getShows, setShows, updateShow, deleteShow} = require('../controllers/showController')

router.route('/').get(getShows).post(setShows)
router.route('/:id').put(updateShow).delete(deleteShow)


module.exports = router