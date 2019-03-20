var express = require('express')
var router = express.Router()

var binRouter = require('./api/bin')
var itemRouter = require('./api/item')

/**
 * @api {get} /api API route
 * @apiDescription Index for all interactions with the inventory API, returns empty JSON data
 * @apiName API
 * @apiGroup API
 */
router.get('/', function(req, res, next) {
  res.json({})
})

router.use('/item', itemRouter)
router.use('/bin', binRouter)

module.exports = router
