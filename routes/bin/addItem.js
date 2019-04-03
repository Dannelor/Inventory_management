var express = require('express')
var router = express.Router()

var api = require('../../api/api')

router.get('/:binID(\\d+)/:UPC(\\d+)', function(req, res) {
  var binID = req.params.binID
  var UPC = req.params.UPC
  res.render('bin/additem', {
    title: 'Add Item',
    binID: binID,
    item: item,
  })
})

module.exports = router
