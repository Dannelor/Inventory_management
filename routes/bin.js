var express = require('express')
var router = express.Router()

var api = require('../api/api')

router.get('/', function(req, res) {
  res.redirect('../')
})

router.get('/:binID(\\d+)', function(req, res) {
  var binID = parseInt(req.params.binID)
  api.getItems(binID).then(function(response) {
    var items = JSON.parse(JSON.stringify(response))
    res.render('bins', {
      title: 'Bins',
      binID: binID,
      items: items,
    })
  })
})

module.exports = router
