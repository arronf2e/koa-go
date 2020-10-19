import { SwaggerRouter } from "koa-swagger-decorator";
import { user } from "../controller";

const protectedRoutes = new SwaggerRouter();

protectedRoutes.get("/users", user.getUsers);

protectedRoutes.swagger({
  title: "node-typescript-koa-rest",
  description:
    "API REST using NodeJS and KOA framework, typescript. TypeORM for SQL with class-validators. Middlewares JWT, CORS, Winston Logger.",
  version: "1.5.0",
});

protectedRoutes.mapDir(__dirname);

export { protectedRoutes };
