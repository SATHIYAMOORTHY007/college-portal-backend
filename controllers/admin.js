const express = require('express')
const Examiner = require('../models/examiner')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createExaminer = async (req, res) => {
  try {
    const { username, pwd, Role } = req.body

    if (!username || !pwd)
      return res.status(400).send({ message: 'password or username required' })
    //duplicated username
    const duplicate = await Examiner.findOne({ name: username }).exec()
    if (duplicate)
      return res.status(401).send({ message: 'already existing..' })

    const hashpwd = await bcrypt.hash(pwd, 10)
    const result = await Examiner.create({
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

const getAllExaminer = async (req, res) => {
  const allStudent = await Examiner.find()
  if (!allStudent) return res.status(404).json({ message: 'no data' })
  return res.status(200).json({ message: allStudent })
}
module.exports = { createExaminer, getAllExaminer }
