var express = require('express')
var router = express.Router()

/**
 * @api {get} /api/bin Bin Items
 * @apiDescription Returns all items stored within a given bin
 * @apiName GetBin
 * @apiGroup API
 *
 * @apiParam {Number=1..N} binID ID of the bin to find items within
 */
router.get('/:binID', function(req, res, next) {
  // TODO: Implement database search
  res.json({})
})

module.exports = router
