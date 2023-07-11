const express = require('express')
const router = express.Router()
const {
  createStudent,
  getAllStudent,
  getParticularStudent,
  deleteStudent,
  updateStudent,
} = require('../controllers/student')
const { verifyToken, verifyPrivate } = require('../utils/verifyToken')
router.post('/create', verifyPrivate, createStudent)
router.get('/getAllStudent', verifyPrivate, getAllStudent)
router.delete('/deleteStudent/:id', verifyPrivate, deleteStudent)
router.put('/updateStudent/:student_id', verifyPrivate, updateStudent)
router.get(
  '/getParticularStudent/:student_id',

  getParticularStudent,
)
module.exports = router
