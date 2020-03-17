module.exports = () => {
  return async (ctx, next) => {
    try {
      console.log('error handler middleware')
      await next()
    } catch (error) {
      console.log(error)
      ctx.body = {
        code: '500',
        msg: '服务器未知错误'
      }
    }
  }
}