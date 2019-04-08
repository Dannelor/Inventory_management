var express = require('express')
var router = express.Router()
var db = require('../api/db.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

/* GET users listing. */
router.post('/login', function(req, res, next) {
  var username = req.body.username
  var password = req.body.password
  var p = new Promise(function(resolve, reject) {
    db.then(function(result) {
      result.query('SELECT * FROM Users WHERE email = ?', [username], function(
        error,
        results,
        fields
      ) {
        console.log(error)
        if (error) {
          // console.log("error ocurred",error);
          res.send({
            code: 400,
            failed: 'error ocurred',
          })
        } else {
          // console.log('The solution is: ', results);
          if (results.length > 0) {
            if (results[0].password == password) {
              res.send({
                code: 200,
                success: 'login sucessfull',
                Name: username,
              })
            } else {
              res.send({
                code: 204,
                success: 'Email and password does not match',
              })
            }
          } else {
            res.send({
              code: 204,
              success: 'Email does not exits',
            })
          }
        }
      })
    })
  })
})

router.post('/register', function(req, res, next) {
  console.log('Hello')
  let errors = []
  const name = req.body.fname
  const email = req.body.username
  const password = req.body.password
  const password2 = req.body.password2
  var newuser = {
    email: email,
    Name: name,
    password: password,
    AccessLevel: 2,
  }

  console.log('Hello')
  var p = new Promise(function(resolve, reject) {
    db.then(function(result) {
      result.query('INSERT INTO Users SET ?', newuser, function(
        error,
        results,
        fields
      ) {
        if (error) {
          console.log('error ocurred', error)
          res.send({
            code: 400,
            failed: 'error ocurred',
          })
        } else {
          console.log('The solution is: ', results)
          res.send({
            code: 200,
            success: 'user registered sucessfully',
            Name: username,
          })
        }
      })
    })
  })
})

module.exports = router
