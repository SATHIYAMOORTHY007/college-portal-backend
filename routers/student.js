const express = require('express')
const router = express.Router()
const {
  createStudent,
  getAllStudent,
  getParticularStudent,
} = require('../controllers/student')

router.post('/create', createStudent)
router.get('/getAllStudent', getAllStudent)

router.get('/getParticularStudent/:student_id', getParticularStudent)
module.exports = router
