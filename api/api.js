const db = require('./db')

var API = {}

// Bin Functions
API.getItems = function(binID) {
  var p = new Promise(function(resolve, reject) {
    db.query(
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

  return p
}

API.newBin = function(name, description) {
  var p = new Promise(function(resolve, reject) {
    db.query(
      `INSERT INTO Bins (Name,Description) VALUES (?,?)`,
      [name, description],
      function(error, result) {
        if (error) reject(error)
        resolve(result)
      }
    )
  })

  return p
}

API.getBins = function() {
  var p = new Promise(function(resolve, reject) {
    db.query(`SELECT * FROM Bins`, function(error, result) {
      if (error) reject(error)
      resolve(result)
    })
  })

  return p
}

API.updateBinInfo = function(binID, name, description) {
  var p = new Promise(function(resolve, reject) {
    db.query(
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
API.addItem = function(UPC, binID, quantity) {
  var p = new Promise(function(resolve, reject) {
    db.query(
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

  return p
}

API.getItemInfo = function(UPC) {
  var p = new Promise(function(resolve, reject) {
    db.query(
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
}

API.updateItemQuantity = function(UPC, binID, quantity) {
  return API.addItem(UPC, binID, quantity)
}

module.exports = API
