const express = require('express')
const Principal = require('../models/Principal')
const Examiner = require('../models/examiner')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//principal create
const createPrincipal = async (req, res) => {
  try {
    const { username, pwd, Role, email } = req.body

    if (!username || !pwd || !email)
      return res.status(400).send({ message: 'password or username required' })
    //duplicated email
    const duplicate = await Principal.findOne({ email: email }).exec()
    if (duplicate)
      return res.status(401).send({ message: 'already existing..' })

    //password hashing
    const hashpwd = await bcrypt.hash(pwd, 10)
    const result = await Principal.create({
      email: email,
      name: username,
      password: hashpwd,
      role: Role,
    })
    //generated token
    const token = jwt.sign(
      { id: result._id, role: result.role },
      process.env.jwt,
    )

    res.send({ message: `Principal created ` })
  } catch (err) {
    console.log(err)
  }
}

const createExaminer = async (req, res) => {
  try {
    const { username, pwd, Role, Email } = req.body

    if (!username || !pwd || !Email)
      return res.status(400).send({ message: 'password or username required' })
    //duplicated username

    const duplicate = await Examiner.findOne({ email: Email }).exec()
    if (duplicate)
      return res.status(401).send({ message: 'already existing..' })
    //create hashing
    const hashpwd = await bcrypt.hash(pwd, 10)
    const result = await Examiner.create({
      email: Email,
      name: username,
      password: hashpwd,
      role: Role,
    })

    const token = jwt.sign(
      { id: result._id, role: result.role },
      process.env.jwt,
    )

    res.send({ message: `Examiner created ` })
  } catch (err) {
    console.log(err)
  }
}

//get all examiner
const getAllExaminer = async (req, res) => {
  const allStudent = await Examiner.find()
  if (!allStudent) return res.status(404).json({ message: 'no data' })
  return res.status(200).json({ message: allStudent })
}

module.exports = {
  createExaminer,
  getAllExaminer,
  createPrincipal,
}
