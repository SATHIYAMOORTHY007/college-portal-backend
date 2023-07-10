const express = require('express')
const Student = require('../models/student')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
//create student
const createStudent = async (req, res) => {
  try {
    const {
      username,
      pwd,
      roll_no,
      department,
      Course,
      sec,
      gen,
      Role,
    } = req.body

    if (!roll_no || !pwd)
      return res.status(400).send({ message: 'Rollno or password required' })
    //duplicated rollno
    const duplicate = await Student.findOne({ rollno: roll_no }).exec()
    if (duplicate) return res.send({ message: 'already existing..' })

    const hashpwd = await bcrypt.hash(pwd, 10)
    const student = await Student.create({
      name: username,
      password: hashpwd,
      rollno: roll_no,
      dept: department,
      course: Course,
      section: sec,
      gender: gen,
      role: Role,
    })

    const token = jwt.sign(
      { id: student._id, role: student.role },
      process.env.jwt,
    )

    res.send({ message: `user created ` })
  } catch (err) {
    console.log(err)
  }
}

const getAllStudent = async (req, res) => {
  const allStudent = await Student.find()
  if (!allStudent) return res.status(404).json({ message: 'no data' })
  return res.status(200).json({ message: allStudent })
}

const getParticularStudent = async (req, res) => {
  const id = req.params.student_id

  const student = await Student.findById(
    { _id: id },
    { attendance: 0, exam: 0, password: 0 },
  )
  if (!student) return res.status(404).json({ message: 'no data' })
  return res.status(200).json({ message: student })
}

module.exports = {
  createStudent,
  getAllStudent,

  getParticularStudent,
}
