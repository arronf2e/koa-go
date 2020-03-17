const mysql = require('mysql')
const { dbConfig } = require('../config')

const pool = mysql.createPool(dbConfig)

const db = {}

db.query = (sql, params) => {
  return new Promise((resolve, reject) => {
    // 取出连接
    pool.getConnection((err, connection) => {
      if(err) {
        return
      }
      connection.query(sql, params, (error, results, fileds) => {
        console.log(`${sql} => ${params}`)
        connection.release()
        if(error) {
          reject(error)
          return
        }
        resolve(results)
      })
    })
  })
}

module.exports = db