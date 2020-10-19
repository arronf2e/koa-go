import { BaseContext } from "koa";
import { description, request, summary, tagsAll } from "koa-swagger-decorator";

@tagsAll(["General"])
export default class GeneralController {
  @request("get", "/")
  @summary("Welcome Page")
  @description(
    "A simple welcome message to verify the service is up and running."
  )
  public static async helloWorld(ctx: BaseContext): Promise<void> {
    ctx.body = "hello world";
  }
}
