// 全局配置信息
const path = require('path')
module.exports = {
  PORT: 9909,
  dbConfig: {
    connectionLimit: 10,
    host: '192.168.1.8',
    port: '32788',
    user: 'root',
    password: 'root',
    database: 'koago'

  },
  uploadDir: path.join(__dirname, path.resolve('../public/')), // 上传文件路径,
}