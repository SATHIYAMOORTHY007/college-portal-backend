const express = require('express')
const router = express.Router()
const { createExaminer, getAllExaminer } = require('../controllers/admin')

router.post('/createExaminer', createExaminer)
router.get('/getAllExaminer', getAllExaminer)
module.exports = router
