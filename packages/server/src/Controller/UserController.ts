import {Controller, Get } from '@tsed/common';
import { ReturnsArray } from '@tsed/swagger';
import { User } from '../Entity/User';
import { UserService } from '../Services/UserService';
import { Authenticated } from '../Decorators/AuthenticatedDecorator';
import { RoleEnum } from '../Enums/RoleEnum';

@Controller("/users")
@Authenticated({role: RoleEnum.Admin})
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get("/")
  @ReturnsArray(User)
  getAll() {
    return this.userService.getAll();
  }
}
