const userDao = require('../models/dao/userDao')

module.exports = {
  Login: async ctx => {
    const { userName, password } = ctx.request.body
    const user = await userDao.Login(userName, password)
    console.log(user, 'user')
  }
}