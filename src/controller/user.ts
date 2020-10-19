import { User, userSchema } from "./../entity/user";
import { BaseContext } from "koa";
import { getManager, Repository, Not, Equal, Like } from "typeorm";
import { validate, ValidationError } from "class-validator";
import {
  request,
  summary,
  path,
  body,
  responsesAll,
  tagsAll,
} from "koa-swagger-decorator";

@responsesAll({
  200: { description: "success" },
  400: { description: "bad request" },
  401: { description: "unauthorized, missing/wrong jwt token" },
})
@tagsAll(["User"])
export default class UserController {
  @request("get", "/users")
  @summary("Find All Users")
  public static async getUsers(ctx: BaseContext): Promise<void> {
    const userRepository: Repository<User> = getManager().getRepository(User);
    const users: User[] = await userRepository.find();
    ctx.status = 200;
    ctx.body = users;
  }
}
