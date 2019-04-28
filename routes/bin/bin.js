var express = require('express')
var router = express.Router()

var api = require('../../api/api')

var binScannerRouter = require('./binScanner')
var binAddItemRouter = require('./addItem')

router.use('/binscanner', binScannerRouter)
router.use('/additem', binAddItemRouter)

router.get('/', async (req, res) => {
  res.redirect('../')
})

router.get('/:binID(\\d+)', async (req, res) => {
  // GET Paramaters
  var binID = req.params.binID

  // List of items within the bin
  var items = await api.getItems(binID)

  res.render('bin/bins', {
    title: 'Bins',
    binID: binID,
    items: items,
  })
})

router.get('/:binID(\\d+)/:UPC(\\d+)', async (req, res) => {
  // GET Paramaters
  var binID = req.params.binID
  var UPC = req.params.UPC

  // All item information about requested item
  var item = (await api.getItem(binID, UPC))[0]

  res.render('bin/item', {
    title: 'Item',
    binID: binID,
    item: item,
  })
})
module.exports = router
