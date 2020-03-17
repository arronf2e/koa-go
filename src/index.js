const Koa = require('koa')
const KoaBody = require('koa-body')
const logger = require('koa-logger') 
const config = require('./config')
const { PORT, uploadDir } = config
const errorHandle = require('./middleware/errorHandle')
const app = new Koa()
const router = require('./routers')

app.use(logger())

app.use(errorHandle())

app.use(KoaBody({
  multipart: true, // 支持文件上传
  // encoding: 'gzip',
  formidable: {
    uploadDir: uploadDir,  // 文件上传目录
    keepExtensions: true, // 保持文件后缀
    maxFieldsSize: 2 * 1024 * 1024,  // 文件上传大小限制
    onFileBegin: (name, file) => {
      // 文件上传前的设置
    }
  }
}))

app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT)
console.log(`Server is running on port ${PORT}`)