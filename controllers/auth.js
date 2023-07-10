const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Student = require('../models/student')
const Examiner = require('../models/examiner')

const login = async (req, res) => {
  try {
    const user =
      (await Examiner.findOne({ name: req.body.username }).exec()) ||
      (await Student.findOne({ rollno: req.body.username }).exec())
    if (!user) return res.status(404).json({ message: 'user not found' })

    const isPassword = await bcrypt.compare(req.body.pwd, user.password)

    if (!isPassword)
      return res.status(404).json({ message: 'password not match' })

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.jwt)

    const { password, role, ...otherDetails } = user._doc
    return res
      .cookie('token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, token, role })
  } catch (err) {
    return res.sendStatus(400)
  }
}

module.exports = { login }
