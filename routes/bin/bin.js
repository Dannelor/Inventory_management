var express = require('express')
var router = express.Router()

var api = require('../../api/api')

var binScannerRouter = require('./binScanner')
var binAddItemRouter = require('./addItem')

router.use('/binscanner', binScannerRouter)
router.use('/additem', binAddItemRouter)

router.get('/', function(req, res) {
  res.redirect('../')
})

router.get('/:binID(\\d+)', function(req, res) {
  var binID = req.params.binID
  api.getItems(binID).then(function(response) {
    var items = JSON.parse(JSON.stringify(response))
    res.render('bin/bins', {
      title: 'Bins',
      binID: binID,
      items: items,
    })
  })
})

router.get('/:binID(\\d+)/:UPC(\\d+)', function(req, res) {
  var binID = req.params.binID
  var UPC = req.params.UPC

  api.getItem(binID, UPC).then(function(response) {
    var item = JSON.parse(JSON.stringify(response))
    console.log(item[0])
    res.render('bin/item', {
      title: 'Item',
      binID: binID,
      item: item[0],
    })
  })
})
module.exports = router
