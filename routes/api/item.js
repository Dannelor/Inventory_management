const express = require('express')
const router = express.Router()
const api = require('../../api/api')

/**
 * @api {post} /api/item Update Quantity
 * @apiDescription Updates the quantity of an item
 * @apiName Item
 * @apiGroup API
 *
 * @apiParam {String} binID Bin that is being updated
 * @apiParam {String} UPC The UPC of the item to update
 * @apiParam {String} Quantity the new quantity of the item
 *
 * @apiSuccess {JSON} response Response from the SQL server
 */
router.post('/updatequantity', async (req, res) => {
  // POST Paramaters
  var binID = req.body.binID
  var UPC = req.body.UPC
  var quantity = req.body.quantity

  // Update quantity and return result
  res.json(await api.updateItemQuantity(UPC, binID, quantity))
})

/**
 * @api {post} /api/item Remove Item
 * @apiDescription Removes the item from the inventory
 * @apiName Item
 * @apiGroup API
 *
 * @apiParam {String} binID Bin that is being updated
 * @apiParam {String} UPC The UPC of the item to be removed
 *
 * @apiSuccess {JSON} response Response from the SQL server
 */
router.post('/remove', async (req, res) => {
  // POST paramaters
  var binID = req.body.binID
  var UPC = req.body.UPC

  // Remove item and return result
  res.json(await api.removeItem(binID, UPC))
})
module.exports = router
