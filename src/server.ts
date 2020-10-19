import Koa from "koa";
import { createConnection } from "typeorm";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import winston from "winston";
import jwt from "koa-jwt";
import "reflect-metadata";

import { config } from "./config";
import { logger } from "./middleware/logger";
import { unprotectedRoutes } from "./routes/unprotectedRoutes";
import { protectedRoutes } from "./routes/protectedRoutes";
import { cron } from "./cron";

createConnection({
  type: "mysql",
  url: config.databaseUrl,
  synchronize: true,
  logger: "advanced-console",
  entities: config.dbEntitiesPath,
  extra: {
    ssl: config.dbsslconn, // if not development, will use SSL
  },
})
  .then(async () => {
    const app = new Koa();
    // helmet 通过增加如Strict-Transport-Security, X-Frame-Options, X-Frame-Options等HTTP头提高应用安全性
    app.use(helmet());
    app.use(cors());
    app.use(logger(winston));
    app.use(bodyParser());

    app.use(unprotectedRoutes.routes()).use(unprotectedRoutes.allowedMethods());

    app.use(
      jwt({ secret: config.jwtSecret }).unless({ path: [/^\/swagger-/] })
    );

    app.use(protectedRoutes.routes()).use(protectedRoutes.allowedMethods());

    app.listen(config.port);

    cron.start();

    console.log(`Server running on port ${config.port}`);
  })
  .catch((error: string) => console.log("TypeORM connection error: ", error));
