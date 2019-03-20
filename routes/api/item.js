const express = require('express')
const router = express.Router()
const api = require('../../api/api')

router.post('/updatequantity', function(req, res) {
  var binID = req.body.binID
  var UPC = req.body.UPC
  var quantity = req.body.quantity

  api.updateItemQuantity(UPC, binID, quantity).then(function(response) {
    res.json(response)
  })
})

router.post('/remove', function(req, res) {
  var binID = req.body.binID
  var UPC = req.body.UPC

  api.removeItem(binID, UPC).then(function(response) {
    res.json(response)
  })
})
module.exports = router
