import Router from "@koa/router";
import { general } from "../controller";

const unprotectedRoutes = new Router();

unprotectedRoutes.get("/", general.helloWorld);

export { unprotectedRoutes };
