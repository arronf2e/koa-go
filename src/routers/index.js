const Router = require('koa-router')

const router = new Router()

const userRouter = require('./modules/userRouter')

router.use(userRouter.routes())

router.prefix('/api')

module.exports = router