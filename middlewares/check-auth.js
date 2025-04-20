const jwt = require('jsonwebtoken')
const JWT_SECRET = 'medhaviji'

function checkAuth(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    console.log('Could not authenticate you!')
    res.redirect('/login')
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.redirect('/login')
    }
    req.user = user;
    res.locals.isAuth = true
    next();
  })
}

module.exports = checkAuth