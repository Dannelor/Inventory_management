var express = require('express')
var router = express.Router()
var db = require('../api/db')
var api = require('../api/api')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

/* POST login */
router.post('/login', async (req, res, next) => {
  // Post paramaters
  var username = req.body.username
  var password = req.body.password

  // Get user info for given username
  const userInfo = (await api.getUserInfo(username))[0]

  // Nothing was found for username
  if (!userInfo)
    res.send({
      code: 400,
      failed: 'error ocurred',
    })

  // Password matches database
  if (password == userInfo.Password) res.redirect('/bin')
  else
    res.send({
      code: 204,
      success: 'Email and password does not match',
    })
})

router.post('/register', function(req, res, next) {
  // POST Paramaters
  const name = req.body.fname
  const email = req.body.username
  const password = req.body.password

  // Register User
  const registered = api.registerUser(email, password, 2)

  // Something went wrong
  if (!registered)
    res.send({
      code: 400,
      failed: 'error ocurred',
    })

  // Successfully registered
  res.redirect('/')
  //res.send({
  //  code: 200,
  //  success: 'user registered sucessfully',
  //  Name: name,
  //})
})

module.exports = router
