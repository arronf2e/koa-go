const db = require('../db')

module.exports = {
  Login: async(userName, password) => {
    const sql = 'select * from user where userName = ? and password = ?'
    return await db.query(sql, [userName, password])
  },
  Register: async(userName, password) => {
    const sql = 'insert into user value(null, ?, ?, null)'
    return await db.query(sql, [userName, password])
  },
  FindUserName: async userName => {
    const sql = 'select * from user where userName = ?'
    return await db.query(sql, [userName])
  }
}