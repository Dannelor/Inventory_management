var express = require('express')
var router = express.Router()

var api = require('../../api/api')

router.get('/:binID(\\d+)/:UPC(\\d+)', function(req, res) {
  var binID = req.params.binID
  var UPC = req.params.UPC
  api
    .getItemInfo(UPC)
    .then(function(result) {
      if (result.length == 0) {
        res.render('bin/newItem', {
          UPC: UPC,
          binID: binID,
        })
      } else {
        var itemMeta = JSON.parse(JSON.stringify(result))
        api.getItemCount(binID, UPC).then(function(result) {
          var item = JSON.parse(JSON.stringify(result))
          res.render('bin/updateItem', {
            UPC: UPC,
            binID: binID,
            itemMeta: itemMeta,
            itemQuantity: result.Quantity,
          })
        })
      }
    })
    .catch(function(err) {
      console.log(err)
    })
})

router.post('/new/', function(req, res) {
  var binID = req.body.itemBin
  var UPC = req.body.itemUPC
  var quantity = req.body.itemQuantity
  var name = req.body.itemName
  var description = req.body.itemDescription

  api
    .newItem(UPC, binID, quantity, name, description)
    .then(function(result) {
      res.redirect('/bin/' + binID)
    })
    .catch(function(err) {
      res.redirect('/bin/' + binID)
    })
})

router.post('/update/', function(req, res) {
  var binID = req.body.itemBin
  var UPC = req.body.itemUPC
  var quantity = req.body.itemQuantity

  api.addItem(UPC, binID, quantity).then(function(result) {
    api.getItems(binID).then(function(response) {
      var items = JSON.parse(JSON.stringify(response))
      res.redirect('/bin/' + binID)
    })
  })
})

module.exports = router
