const express = require('express')
const router = express.Router()
const {
  createExaminer,
  getAllExaminer,
  createPrincipal,
} = require('../controllers/admin')
const { verifyAdmin, verifyPrivate } = require('../utils/verifyToken')
router.post('/createExaminer', verifyAdmin, createExaminer)
router.get('/getAllExaminer', verifyPrivate, getAllExaminer)
router.post('/createPrincipal', verifyAdmin, createPrincipal)

module.exports = router
