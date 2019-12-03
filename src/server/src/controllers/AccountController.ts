import { User } from '../entity/User';
import {
  JsonController,
  Res,
  BodyParam,
  Post,
  NotFoundError, Authorized, Param, Body, QueryParam, Get, Req, UseBefore, UploadedFile,
} from 'routing-controllers';
import { Inject } from 'typedi';
import { UserService } from '../services/UserService';
import { MailerService } from '../services/MailerService';
import {AuthorizedMiddleware} from "../middlewares/AuthorizedMiddleware";
import { CurrentUser } from '../middlewares/decorators/CurrentUserDecorator';
import fileUploadOptions from '../../config/multer'

import multer from 'multer';

@UseBefore(AuthorizedMiddleware)
@JsonController('/account')
export class AccountController {

  @Inject()
  private userService: UserService;

  @Inject()
  private mailerService: MailerService;

  @Get()
  public async httpGetAccount(@CurrentUser({ required: true }) user: User)  {
    return user;
  }

  @Post("/profile")
  public async httpPostAccountProfile(
    @CurrentUser({ required: true }) user: User,
    @BodyParam('firstName') firstName: string,
    @BodyParam('lastName') lastName: string,
    @BodyParam('email') email: string,
    @UploadedFile("avatar", { options: fileUploadOptions }) avatar: any
  )  {
    console.log("avatar", avatar);
    return this.userService.save(Object.assign(user,{ firstName, lastName, email }));
  }

  @Post("/password")
  public async httpPostAccountPassword(@CurrentUser({ required: true }) user: User)  {
    return user;
  }
}
