const express = require('express')
const Student = require('../models/student')
const Exam = require('../models/exam')
const Leave = require('../models/leave')

const createExam = async (req, res) => {
  try {
    let exam = await Exam.create(req.body)
    exam.save()
    return res.status(201).json({ message: exam })
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: err.message })
  }
}

const getAllExam = async (req, res) => {
  const allexam = await Exam.find()
  if (!allexam) return res.status(404).json({ message: 'no data' })
  return res.status(200).json({ message: allexam })
}

const getParticularStudentExam = async (req, res) => {
  const id = req.params.student_id
  const sem = req.params.sem

  const student = await Exam.find({ studentId: id })

  let array = student.filter(function (el) {
    return el.name == sem
  })
  if (!student) return res.status(404).json({ message: 'no data' })
  return res.status(200).json({ message: array })
}

const createLeave = async (req, res) => {
  try {
    let leave = await Leave.create(req.body)
    leave.save()
    return res.status(201).json({ message: leave })
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: err.message })
  }
}

const getParticularStudentLeave = async (req, res) => {
  const id = req.params.student_id
  const sem = req.params.sem
  let result = []
  const leave = await Leave.find({ studentId: id })
  let array = leave.filter(function (el) {
    return el.name == sem
  })

  for (let i = 0; i < array.length; i++) {
    result.push(array[i].date)
  }
  if (!leave) return res.status(404).json({ message: 'no data' })
  return res.status(200).json(result)
}

module.exports = {
  createExam,
  getAllExam,
  getParticularStudentExam,
  createLeave,
  getParticularStudentLeave,
}
