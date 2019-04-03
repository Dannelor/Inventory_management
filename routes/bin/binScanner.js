var express = require('express')
var router = express.Router()

router.get('/:binID(\\d+)', (req, res) => {
  var binID = req.params.binID
  res.render('bin/binScanner', { binID: binID })
})

module.exports = router
