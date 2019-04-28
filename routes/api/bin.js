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
router.get('/:binID(\\d+)', async (req, res) => {
  res.json(await api.getItems(req.params.binID))
})

/**
 * @api {post} /api/bin Bin Items
 * @apiDescription Creates a new Bin with name and description
 * @apiName Bin
 * @apiGroup API
 *
 * @apiParam {String} name Name of the new bin
 * @apiParam {String} description Description of the new bin
 *
 * @apiSuccess {JSON} response Response from the SQL server
 */
router.post('/new', async (req, res) => {
  res.json(await api.newBin(req.body.name || '', req.body.description || ''))
})

/**
 * @api {post} /api/bin Bin Items
 * @apiDescription Updates a bins name and description
 * @apiName Bin
 * @apiGroup API
 *
 * @apiParam {String} binID Bin that is being updated
 * @apiParam {String} name New name of the bin
 * @apiParam {String} description New description of the bin
 *
 * @apiSuccess {JSON} response Response from the SQL server
 */
router.post('/update', async (req, res) => {
  // Name and Description must be set
  if (!(res.body.name && req.body.description)) res.status(400).send({})

  // Update bin info and return result
  res.json(await API.updateBinInfo(req.body.name, req.body.description))
})

module.exports = router
