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
router.get('/', async (req, res) => {
  var bins = await api.getBins()
  res.render('index', {
    title: 'Express',
    bins: bins,
  })
})

router.use('/bin', binPage)

module.exports = router
