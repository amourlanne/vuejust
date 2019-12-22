import {Controller, Get } from '@tsed/common';
import { ReturnsArray } from '@tsed/swagger';
import { User } from '../entity/User';
import { UserService } from '../services/UserService';
import config from '../../config';
import { Authenticated } from '../decorators/AuthenticatedDecorator';

@Controller("/users")
@Authenticated({role: config.security.roles.admin})
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get("/")
  @ReturnsArray(User)
  getAll() {
    return this.userService.getAll();
  }
}
