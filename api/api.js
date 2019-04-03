const db = require('./db')

var API = {}

// Bin Functions
/**
 * API.getItems
 *
 * Return all of the items within a bin
 *
 * @param Number BinID The bin items should be found within
 *
 * @returns Promise Promise that will return the result of the query
 */
API.getItems = function(binID) {
  var p = new Promise(function(resolve, reject) {
    db.then(function(result) {
      result.query(
        `SELECT Items.UPC,Items.Bin,Items.Quantity,ItemMeta.Name,ItemMeta.Description
                    FROM Items
                    LEFT JOIN ItemMeta
                    ON Items.UPC = ItemMeta.UPC
                    WHERE Bin = ?`,
        [binID],
        function(error, result) {
          if (error) reject(error)
          resolve(result)
        }
      )
    })
  })

  return p
}

/**
 * API.newBin
 *
 * Create a new bin in the inventory system
 *
 * @param String name A name that will represent the bin
 * @param String dsecription A description of the contents of the bin
 *
 * @returns Promise Promise that will return the result of the query
 */
API.newBin = function(name, description) {
  var p = new Promise(function(resolve, reject) {
    db.then(function(result) {
      result.query(
        `INSERT INTO Bins (Name,Description) VALUES (?,?)`,
        [name, description],
        function(error, result) {
          if (error) reject(error)
          resolve(result)
        }
      )
    })
  })

  return p
}

/**
 * API.getBins
 *
 * Retreive every bin that is currently in the system
 *
 * @returns Promise Promise that will return the result of the query
 */
API.getBins = function() {
  var p = new Promise(function(resolve, reject) {
    db.then(function(result) {
      result.query(`SELECT * FROM Bins`, function(error, result) {
        if (error) reject(error)
        resolve(result)
      })
    })
  })

  return p
}

/**
 * API.updateBinInfo
 *
 * Update the Name and Description of a bin
 *
 * @param Number binID The ID of the bin that will be modified
 * @param String name A name that will represent the bin
 * @param String dsecription A description of the contents of the bin
 *
 * @returns Promise Promise that will return the result of the query
 */
API.updateBinInfo = function(binID, name, description) {
  var p = new Promise(function(resolve, reject) {
    db.then(function(result) {
      result.query(
        `UPDATE Bins 
                    SET Name = ?, Description = ?
                    WHERE BinID = ?`,
        [name, description, binID],
        function(error, result) {
          if (error) reject(error)
          resolve(result)
        }
      )
    })
  })
}

// Item functions

/**
 * API.addItem
 *
 * Adds a new Item to the inventory of a bin
 *
 * @param Number UPC UPC Value of the item being added
 * @param Number BinID ID of the bin that the item is being put into
 * @param Number quantity How many of this item are located within the bin
 *
 * @returns Promise Promise that will return the result of the query
 */
API.addItem = function(UPC, binID, quantity) {
  var p = new Promise(function(resolve, reject) {
    db.then(function(result) {
      result.query(
        `INSERT INTO items (UPC,Bin,Quantity) 
                    VALUES (?,?,?)
                    ON DUPLICATE KEY UPDATE Quantity=VALUES(Quantity)`,
        [UPC, binID, quantity],
        function(error, result) {
          if (error) reject(error)

          resolve(result)
        }
      )
    })
  })

  return p
}

/**
 * API.removeItem
 *
 * Delete and item from a bin
 *
 * @param Number BinID The bin items should be found within
 * @param Number UPC The UPC of the item to be deleted
 *
 * @returns Promise Promise that will return the result of the query
 */
API.removeItem = function(binID, UPC) {
  var p = new Promise(function(resolve, reject) {
    db.then(function(result) {
      result.query(
        `DELETE FROM Items WHERE Bin=? AND UPC=?`,
        [binID, UPC],
        function(error, result) {
          if (error) reject(error)
          resolve(result)
        }
      )
    })
  })

  return p
}

/**
 * API.getItem
 *
 * Get full data about an item in a bin
 *
 * @param Number BinID The bin items should be found within
 * @param Number UPC The UPC of the item
 *
 * @returns Promise Promise that will return the result of the query
 */
API.getItem = function(binID, UPC) {
  var p = new Promise(function(resolve, reject) {
    db.then(function(result) {
      result.query(
        `SELECT Items.UPC,Items.Bin,Items.Quantity,ItemMeta.Name,ItemMeta.Description
              FROM Items
              LEFT JOIN ItemMeta
              ON Items.UPC = ItemMeta.UPC
              WHERE Bin = ?`,
        [binID, UPC],
        function(error, result) {
          if (error) reject(error)
          resolve(result)
        }
      )
    })
  })

  return p
}

/**
 * API.getItemInfo
 *
 * Returns the Item Meta information based on UPC
 *
 * @param Number UPC UPC Value of the item being updated
 * @param Number BinID ID of the bin that the item is within
 * @param Number quantity How many of this item are located within the bin
 *
 * @returns Promise Promise that will return the result of the query
 */
API.getItemInfo = function(UPC) {
  var p = new Promise(function(resolve, reject) {
    db.then(function(result) {
      result.query(
        `SELECT (Name,Description) 
                    FROM ItemMeta
                    WHERE UPC = ?`,
        [UPC],
        function(error, result) {
          if (err) reject(error)
          resolve(result)
        }
      )
    })
  })
}

/**
 * API.updateItemQuantity
 *
 * Update the current count of an item within a bin
 *
 * @param String name A name that will represent the bin
 * @param String dsecription A description of the contents of the bin
 *
 * @returns Promise Promise that will return the result of the query
 */
API.updateItemQuantity = function(UPC, binID, quantity) {
  return API.addItem(UPC, binID, quantity)
}

module.exports = API
