const mongoose = require('mongoose')

const examinerSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
})

module.exports = mongoose.model('examiner', examinerSchema)
