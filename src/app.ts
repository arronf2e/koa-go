import "reflect-metadata";
import Koa from 'koa';
import logger from 'koa-logger'
import { createKoaServer } from "routing-controllers";
import bodyParser from "koa-bodyparser";
import { createConnection } from "typeorm";
import { mysqlConfig, PORT } from "./config";
import { User } from "./entity/User";
import { UserController } from './controllers/UserController'

createConnection({
  type: "mysql",
  host: "192.168.1.101",
  port: 32790,
  username: "root",
  password: "root",
  database: "koa-ts",
  entities: [User],
  synchronize: true,
  logging: false
})
  .then(connection => {
    const app = createKoaServer({
      routePrefix: '/api',
      controllers: [UserController]
    })
    app.use(bodyParser());
    app.use(logger());
    app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`)
  })
  .catch(error => console.log(error));
