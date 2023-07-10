const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  rollno: {
    type: String,
    require: true,
    unique: true,
  },
  dept: {
    type: String,
    require: true,
  },
  course: {
    type: String,
    require: true,
  },
  section: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  role: {
    type: String,
  },
})

module.exports = mongoose.model('Student', studentSchema)
