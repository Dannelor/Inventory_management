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
        res.render('newItem', {
          UPC: UPC,
          binID: binID,
        })
      } else {
        var itemMeta = JSON.parse(JSON.stringify(result))
        res.render('updateItem', {
          UPC: UPC,
          binID: binID,
          itemMeta: itemMeta,
        })
      }
    })
    .catch(function(err) {
      console.log(err)
    })
})

module.exports = router
