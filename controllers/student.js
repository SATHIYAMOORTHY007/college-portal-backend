const express = require('express')
const Student = require('../models/student')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
//create student
const createStudent = async (req, res) => {
  try {
    const {
      username,
      useremail,
      pwd,
      roll_no,
      department,
      Course,
      sec,
      gen,
      Role,
    } = req.body

    if (!roll_no || !pwd || !useremail)
      return res.status(400).send({ message: 'Rollno or password required' })
    //duplicated rollno
    const duplicate = await Student.findOne({ rollno: roll_no }).exec()
    if (duplicate) return res.send({ message: 'already existing..' })

    const hashpwd = await bcrypt.hash(pwd, 10)
    const student = await Student.create({
      name: username,
      email: useremail,
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
  console.log(student)
  if (!student) return res.status(404).json({ message: 'no data' })
  return res.status(200).json({ message: student })
}

//principal delete particular student
const deleteStudent = async (req, res) => {
  const id = req.params.id

  try {
    const student = await Student.findByIdAndDelete({ _id: id })
    if (!student) return res.sendStatus(404)
    return res.send('deleted successfully')
  } catch (e) {
    return res.sendStatus(400)
  }
}

const updateStudent = async (req, res) => {
  const id = req.params.student_id

  const { name, email, rollno, dept, course, section, gender } = req.body
  try {
    const student = await Student.findByIdAndUpdate(id, {
      name,
      email,
      rollno,
      dept,
      course,
      section,
      gender,
    })

    await student.save()
    if (!student) return res.sendStatus(404)
    return res.send(student)
  } catch (e) {
    return res.status(400).send(e)
  }
}
module.exports = {
  createStudent,
  getAllStudent,
  deleteStudent,
  getParticularStudent,
  updateStudent,
}
