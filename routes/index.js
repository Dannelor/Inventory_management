var express = require('express')
var router = express.Router()
var api = require('../api/api')

var binPage = require('./bin/bin')

/**
 * @api {get} / App Entry Point
 * @apiDescription Primary index page for Inventory Management Web App.
 * @apiName GetIndex
 * @apiGroup Index
 */
router.get('/', function(req, res, next) {
  res.render('login', { error: false })
})

module.exports = router
