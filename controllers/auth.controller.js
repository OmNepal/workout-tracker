const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user.model')

const JWT_SECRET = 'medhaviji'

function getSignup(req, res, next) {
  res.render('auth/signup')
}

function getLogin(req, res, next) {
  res.render('auth/login')
}

async function signup(req, res, next) {
  const userData = req.body
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    const user = new User({
      email: userData.email,
      password: hashedPassword
    })

    const response = await user.signup()
  } catch {
    return next(error)
  }

  res.redirect('/login')
}

async function login(req, res, next) {
  const userData = req.body;

  const matchingUser = await User.findByEmail(userData.email)

  if (!matchingUser) {
    console.log('User does not exist!')
    res.redirect('/signup');
    return;
  }

  const isPasswordMatch = await bcrypt.compare(userData.password, matchingUser.password)

  if (!isPasswordMatch) {
    console.log('Password is incorrect');
    res.redirect('/login')
    return;
  }

  const token = jwt.sign({
    email: matchingUser.email,
  },
    JWT_SECRET,
    {
      expiresIn: '1h'
    })

  console.log('Valid credentials. Logging in ...')
  console.log(token)

  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    maxAge: 3600000
  })

  res.redirect('/')

}

function logout(req, res, next) {
  const token = req.cookies.token

  res.status(202).clearCookie('token') //cookie is lceared by the name of the cookie which is token in this case so 'token' not just token
  res.locals.isAuth = false

  res.redirect('/login')
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout
}
