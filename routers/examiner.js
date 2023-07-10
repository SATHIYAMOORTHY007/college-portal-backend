const express = require('express')
const router = express.Router()
const {
  createExam,
  getAllExam,
  getParticularStudentExam,
  createLeave,
  getParticularStudentLeave,
} = require('../controllers/examiner')
const { verifyPrivate, verifyToken } = require('../utils/verifyToken')
router.post('/createExam', verifyPrivate, createExam)
router.get('/getAllExam', verifyPrivate, getAllExam)
router.get(
  '/StudentExam/:student_id/:sem',
  verifyToken,
  getParticularStudentExam,
)
router.post('/createLeave', verifyPrivate, createLeave)
router.get(
  '/StudentLeave/:student_id/:sem',
  verifyToken,
  getParticularStudentLeave,
)
module.exports = router
