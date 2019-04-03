var mysql = require('mysql')

const config = {
  host: 'remotemysql.com',
  database: 'b6GvxAjWBd',
  port: 3306,
  username: 'b6GvxAjWBd',
  password: 'fCf6o9VPOs',
}

var connection = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database,
  port: config.port,
})

var promise = new Promise(function(resolve, reject) {
  connection.connect(function(err) {
    if (err) reject(err)
    console.log('Connected to database')
    resolve(connection)
  })
})

module.exports = promise
