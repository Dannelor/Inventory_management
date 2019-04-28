var express = require('express')
var router = express.Router()

/**
 * @api {get} /login Home Page
 * @apiDescription Login page for application
 * @apiName GetLogin
 * @apiGroup Login
 */
router.get('/', function(req, res, next) {
  res.render('login', { error: false })
})

module.exports = router
