var express = require('express')
var router = express.Router()
var API = require('../api/api')

var binPage = require('./bin/bin')

/**
 * @api {get} / App Entry Point
 * @apiDescription Primary index page for Inventory Management Web App.
 * @apiName GetIndex
 * @apiGroup Index
 */
router.get('/', function(req, res, next) {
  API.getBins().then(function(result) {
    var bins = JSON.parse(JSON.stringify(result))

    res.render('index', {
      title: 'Express',
      bins: bins,
    })
  })
})

router.use('/bin', binPage)

module.exports = router
