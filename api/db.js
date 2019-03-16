var mysql = require('mysql')

const config = {
  host: 'localhost',
  database: 'inventory',
  port: 3306,
  username: 'inventory_admin',
  password: 'password',
}

queries = [
  `CREATE DATABASE IF NOT EXISTS ` + config.database,
  `USE ` + config.database,
  `CREATE TABLE IF NOT EXISTS Bins (
      BinID INT NOT NULL AUTO_INCREMENT,
      Name VARCHAR(32),
      Description VARCHAR(256),
      PRIMARY KEY (BinID)
    )`,
  `CREATE TABLE IF NOT EXISTS Items (
      UPC INT NOT NULL,
      Bin INT NOT NULL,
      Quantity INT NOT NULL,
      FOREIGN KEY (bin) REFERENCES Bins(BinID) ON DELETE CASCADE,
      PRIMARY KEY (upc, bin)
    )`,
  `CREATE TABLE IF NOT EXISTS ItemMeta (
      UPC INT NOT NULL,
      Name VARCHAR(32),
      Description VARCHAR(256)
    )`,
]

var connection = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
  port: config.port,
})

connection.connect(function(err) {
  if (err) throw err
  console.log('Connected to database')
  console.log('Setting up database and tables')
  queries.forEach(query => {
    connection.query(query, function(err) {
      if (err) throw err
    })
  })
})

module.exports = connection
