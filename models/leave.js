const mongoose = require('mongoose')

const leaveSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  date: {
    type: Date,
    require: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    require: true,
  },
})

module.exports = mongoose.model('leave', leaveSchema)
