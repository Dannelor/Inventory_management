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
API.getItems = async function(binID) {
  return new Promise(async (resolve, reject) => {
    const database = await db
    database.query(
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
API.newBin = async function(name, description) {
  return new Promise(async (resolve, reject) => {
    const database = await db
    database.query(
      `INSERT INTO Bins (Name,Description) VALUES (?,?)`,
      [name, description],
      function(error, result) {
        if (error) reject(error)
        resolve(result)
      }
    )
  })
}

/**
 * API.getBins
 *
 * Retreive every bin that is currently in the system
 *
 * @returns Promise Promise that will return the result of the query
 */
API.getBins = async function() {
  return new Promise(async (resolve, reject) => {
    const database = await db
    database.query(`SELECT * FROM Bins`, function(error, result) {
      if (error) reject(error)
      resolve(result)
    })
  })
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
API.updateBinInfo = async function(binID, name, description) {
  return new Promise(async (resolve, reject) => {
    const database = await db
    database.query(
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
API.addItem = async function(UPC, binID, quantity) {
  return new Promise(async (resolve, reject) => {
    const database = await db
    database.query(
      `INSERT INTO Items (UPC,Bin,Quantity)
                    VALUES (?,?,?)
                    ON DUPLICATE KEY UPDATE Quantity=VALUES(Quantity)`,
      [UPC, binID, quantity],
      function(error, result) {
        if (error) reject(error)

        resolve(result)
      }
    )
  })
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
API.removeItem = async function(binID, UPC) {
  return new Promise(async (resolve, reject) => {
    const database = await db
    database.query(
      `DELETE FROM Items WHERE Bin=? AND UPC=?`,
      [binID, UPC],
      function(error, result) {
        if (error) reject(error)
        resolve(result)
      }
    )
  })
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
API.getItem = async function(binID, UPC) {
  return new Promise(async (resolve, reject) => {
    const database = await db
    database.query(
      `SELECT Items.UPC,Items.Bin,Items.Quantity,ItemMeta.Name,ItemMeta.Description
              FROM Items
              LEFT JOIN ItemMeta
              ON Items.UPC = ItemMeta.UPC
              WHERE Bin = ? AND Items.UPC = ?`,
      [binID, UPC],
      function(error, result) {
        if (error) reject(error)
        resolve(result)
      }
    )
  })
}

/**
 * API.getItemCount
 *
 * Get the quantity of a current item in a bin
 *
 * @param Number BinID The bin items should be found within
 * @param Number UPC The UPC of the item
 *
 * @returns Promise Promise that will return the result of the query
 */
API.getItemCount = async function(binID, UPC) {
  return new Promise(async (resolve, reject) => {
    const database = await db
    database.query(
      `SELECT Quantity FROM Items WHERE Bin = ? AND UPC = ?`,
      [binID, UPC],
      function(error, result) {
        if (error) reject(error)
        resolve(result)
      }
    )
  })
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
API.getItemInfo = async function(UPC) {
  return new Promise(async (resolve, reject) => {
    db.then(function(connection) {
      connection.query(
        `SELECT Name,Description
          FROM ItemMeta
          WHERE UPC = ?`,
        [UPC],
        function(err, result) {
          if (err) reject(err)
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
API.updateItemQuantity = async function(UPC, binID, quantity) {
  return await API.addItem(UPC, binID, quantity)
}

/**
 * API.newItem
 *
 * Adds a new item to the inventory
 *
 * @param Number UPC UPC Value of the item being added
 * @param Number binID ID of the bin that the item is within
 * @param Number quantity How many of this item are located within the bin
 * @param String name Name of the new item
 * @param String description Description of the new item
 *
 * @returns Promise Promise that will return the result of the query
 */
API.newItem = async function(UPC, binID, quantity, name, description) {
  return new Promise(async (resolve, reject) => {
    const database = await db
    database.query(
      `INSERT INTO ItemMeta VALUES (?,?,?) ON DUPLICATE KEY UPDATE Name= VALUES(Name), Description=(Description);`,
      [UPC, name, description],
      function(error, result) {
        if (error) reject(error)
        API.addItem(UPC, binID, quantity).then(function(result) {
          resolve(result)
        })
      }
    )
  })
}

/**
 * API.getUserInfo
 *
 * Gets the login information of a user
 *
 * @param String Email of the user
 *
 * @returns Promise Promise that will return the result of the query
 */
API.getUserInfo = async function(email) {
  return new Promise(async (resolve, reject) => {
    const database = await db
    database.query('SELECT * FROM Users WHERE EMail = ?', [email], function(
      error,
      result
    ) {
      if (error) reject(error)
      resolve(result)
    })
  })
}

/**
 * API.registerUser
 *
 * Register a new user
 *
 * @param String Email of the user
 * @param String Password of the user
 * @param Int AccessLevel Access Level of the user
 *
 * @returns Promise Promise that will return the result of the query
 */
API.registerUser = async function(email, password, accesslevel,name) {
  return new Promise(async (resolve, reject) => {
    const database = await db
    database.query(
      'INSERT INTO Users (EMail,Password,AccessLevel,Name) VALUES (?,?,?,?)',
      [email, password, accesslevel,name],
      function(error, result) {
        if (error) reject(error)
        resolve(result)
      }
    )
  })
}
module.exports = API
