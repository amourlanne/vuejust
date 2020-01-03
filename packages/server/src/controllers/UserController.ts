import {Controller, Get } from '@tsed/common';
import { ReturnsArray } from '@tsed/swagger';
import { User } from '../entity/User';
import { UserService } from '../services/UserService';
import { Authenticated } from '../decorators/AuthenticatedDecorator';
import { RoleEnum } from '../enums/RoleEnum';

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
