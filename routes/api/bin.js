var express = require('express')
var router = express.Router()
const api = require('../../api/api')

/**
 * @api {get} /api/bin Bin Items
 * @apiDescription Returns all items stored within a given bin
 * @apiName Bin
 * @apiGroup API
 *
 * @apiParam {Number=1..N} binID ID of the bin to find items within
 *
 * @apiSuccess {JSON} response Response from the SQL server
 */
router.get('/:binID(\\d+)', function(req, res) {
  var binID = parseInt(req.params.binID)
  api.getItems(binID).then(function(response) {
    res.json(response)
  })
})

/**
 * @api {post} /api/bin Bin Items
 * @apiDescription Creates a new Bin with name and description
 * @apiName Bin
 * @apiGroup API
 *
 * @apiParam {String} name Name of the new bin
 * @apiParam {String} descirption Description of the new bin
 *
 * @apiSuccess {JSON} response Response from the SQL server
 */
router.post('/new', function(req, res) {
  api
    .newBin(req.params.name || '', req.params.description || '')
    .then(function(response) {
      res.json(response)
    })
})

/**
 * @api {post} /api/bin Bin Items
 * @apiDescription Updates a bins name and description
 * @apiName Bin
 * @apiGroup API
 *
 * @apiParam {String} binID Bin that is being updated
 * @apiParam {String} name New name of the bin
 * @apiParam {String} descirption New description of the bin
 *
 * @apiSuccess {JSON} response Response from the SQL server
 */
router.post('/update', function(req, res) {
  api
    .newBin(req.params.name || '', req.params.description || '')
    .then(function(response) {
      res.json(response)
    })
})

module.exports = router
