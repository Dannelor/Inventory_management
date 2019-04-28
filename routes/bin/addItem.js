var express = require('express')
var router = express.Router()

var api = require('../../api/api')

router.get('/:binID(\\d+)/:UPC(\\d+)', async function(req, res) {
  // GET Paramaters
  const binID = req.params.binID
  const UPC = req.params.UPC

  // Item Meta information for UPC
  const itemMeta = (await api.getItemInfo(UPC))[0]

  // If no ItemMeta was found, get the user to define it
  if (!itemMeta)
    return res.render('bin/newItem', {
      UPC: UPC,
      binID: binID,
    })

  // The quantity of the item in the bin
  const itemCount = (await api.getItemCount(binID, UPC))[0]

  res.render('bin/updateItem', {
    UPC: UPC,
    binID: binID,
    itemMeta: itemMeta,
    itemQuantity: itemCount,
  })
})

router.post('/new/', function(req, res) {
  // POST paramaters
  const binID = req.body.itemBin
  const UPC = req.body.itemUPC
  const quantity = req.body.itemQuantity
  const name = req.body.itemName
  const description = req.body.itemDescription

  // Add item to inventory
  api.newItem(UPC, binID, quantity, name, description)

  res.redirect('/bin/' + binID)
})

router.post('/update/', function(req, res) {
  // POST Paramaters
  const binID = req.body.itemBin
  const UPC = req.body.itemUPC
  const quantity = req.body.itemQuantity

  // Update amount of item in inventory
  api.addItem(UPC, binID, quantity)
  res.redirect('/bin/' + binID)
})

module.exports = router
