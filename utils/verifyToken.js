const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.headers.token

  if (!token) {
    return res.sendStatus(404)
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return res.sendStatus(401)
    }
    next()
  })
}

const verifyPrivate = (req, res, next) => {
  const token = req.headers.token

  if (!token) {
    return res.sendStatus(404)
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (
      user.role == 'admin' ||
      user.role == 'principal' ||
      user.role == 'examiner'
    )
      next()
    else {
      return res.sendStatus(401)
    }
  })
}

const verifyAdmin = (req, res, next) => {
  const token = req.headers.token

  if (!token) {
    return res.sendStatus(404)
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (user.role == 'admin') next()
    else {
      return res.sendStatus(401)
    }
  })
}

module.exports = { verifyPrivate, verifyToken, verifyAdmin }
