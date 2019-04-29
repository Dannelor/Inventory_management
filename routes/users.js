var express = require('express')
var router = express.Router()
var db = require('../api/db')
var api = require('../api/api')
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
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
console.log(decrypt(userInfo.Password))
  // Password matches database
  if (password == decrypt(userInfo.Password)) res.redirect('/bin')
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
  const password = encrypt(req.body.password)
  console.log(password)
  // Register User
  const registered = api.registerUser(email, password, 2,name)

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
