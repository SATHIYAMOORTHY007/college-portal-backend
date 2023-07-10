const mongoose = require('mongoose')

const examSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  subjects: [],
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    require: true,
  },
})

module.exports = mongoose.model('Exam', examSchema)
