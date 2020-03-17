const Router = require('koa-router')

const userController = require('../../controllers/userController')

const userRouter = new Router()

userRouter.prefix('/user')

userRouter
  .post('/login', userController.Login)

module.exports = userRouter