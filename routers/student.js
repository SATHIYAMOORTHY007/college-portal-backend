const express = require('express')
const router = express.Router()
const {
  createStudent,
  getAllStudent,
  getParticularStudent,
  deleteStudent,
} = require('../controllers/student')
const { verifyToken, verifyPrivate } = require('../utils/verifyToken')
router.post('/create', verifyPrivate, createStudent)
router.get('/getAllStudent', verifyPrivate, getAllStudent)
router.delete('/deleteStudent/:id', verifyPrivate, deleteStudent)
router.get(
  '/getParticularStudent/:student_id',
  verifyToken,
  getParticularStudent,
)
module.exports = router
