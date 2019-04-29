var express = require('express')
var router = express.Router()
var api = require('../api/api')

var binPage = require('./bin/bin')
router.get('/', async (req, res) => {
  var bins = await api.getBins()
  res.render('bin', {
    title: 'Express',
    bins: bins,
  })
})

router.use('/bin', binPage)

module.exports = router
