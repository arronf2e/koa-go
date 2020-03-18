import { JsonController, Param, Body, Get, Post, Put, Delete, Ctx, HttpCode} from 'routing-controllers'
import { getConnection } from 'typeorm'
import { User } from '../entity/User'

@JsonController('/user')
export class UserController {
  connection: any;

  constructor() {
    this.connection = getConnection()
  }
  @HttpCode(200)
  @Get('/:id')
  async getUser(
    @Param('id') id:string
  ) {
    try {
      const findUser = await this.connection
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.id = :id", { id })
      .getOne();
      if(findUser.id) {
        return findUser
      }
      return {}
    } catch (error) {
      return error
    }
  }

  @Get('/')
  async findAll() {
    const allUsers = await this.connection.getRepository(User).find();
    return allUsers
  }

  @Post('/')
  async updateUser(@Body() user: User) {
    const userRepository = this.connection.getRepository(User)
    const result = userRepository.save(user)
    return result
  }
}