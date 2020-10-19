import * as dotenv from "dotenv";

dotenv.config({
  path: '.env'
})

export interface Config {
  port: number;
  debugLogging: boolean;
  dbsslconn: boolean;
  jwtSecret: string;
  databaseUrl: string;
  dbEntitiesPath: string[];
  cronJobExpression: string;
}

const isDevMode = process.env.NODE_ENV === 'development'

const config: Config = {
  port: +(process.env.PORT || 5000),
  debugLogging: isDevMode,
  dbsslconn: isDevMode,
  jwtSecret: process.env.JWT_SECRET || "your-secret-whatever",
  databaseUrl: process.env.DATABASE_URL || "mysql://root:123456@127.0.0.1:3306/ts-node?charset=utf8",
  dbEntitiesPath: [
    ... isDevMode ? ["src/entity/**/*.ts"] : ["dist/entity/**/*.js"],
  ],
  cronJobExpression: "0 * * * *"
}

export {
  config
}