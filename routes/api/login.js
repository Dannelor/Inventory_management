const express = require('express')
const router = express.Router()
const api = require('../../api/api')

router.post('/', function(req, res) {
  var username = req.body.username
  var password = req.body.password

  api.authenticate(username, password).then(function(response) {
    req.session.privilege = response
    res.json({ privilege: req.session.privilege })
  })
})

module.exports = router
