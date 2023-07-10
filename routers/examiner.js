const express = require('express')
const router = express.Router()
const {
  createExam,
  getAllExam,
  getParticularStudentExam,
  createLeave,
  getParticularStudentLeave,
} = require('../controllers/examiner')

router.post('/createExam', createExam)
router.get('/getAllExam', getAllExam)
router.get('/StudentExam/:student_id/:sem', getParticularStudentExam)
router.post('/createLeave', createLeave)
router.get('/StudentLeave/:student_id/:sem', getParticularStudentLeave)
module.exports = router
