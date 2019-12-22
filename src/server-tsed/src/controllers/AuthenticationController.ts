import { User } from '../entity/User';
import { UserService } from '../services/UserService';
import { MailerService } from '../services/MailerService';
import {
  BodyParams,
  Context,
  Controller,
  Get,
  Next,
  Post,
  QueryParams,
  RequestContext,
  Required,
  Res,
} from '@tsed/common';

import {BadRequest} from "ts-httpexceptions";

@Controller("/")
export class AuthenticationController {

  constructor(private readonly userService: UserService,
              private readonly mailerService: MailerService) {}

  @Post("/login")
  async login(@Required() @BodyParams("username") username: string,
              @Required() @BodyParams("password") password: string,
              @Context() context: RequestContext) {

    const user = await this.userService.getByCredentials(username, password);

    if(!user)
      throw new BadRequest('Bad credentials');

    context.set('user', user);

    return user;
  }

  // @Post("/signup")
  // @Authorized(security.Role.Admin)
  // async signUp(@Body({ validate: true }) user: User,
  //              @QueryParam('sendPassword') sendPassword: boolean) {
  //
  //   const password = user.password;
  //
  //   await this.userService.save(user);
  //
  //   const token = jwt.sign(
  //       { userId: user.id, username: user.username },
  //       security.jwtAccountConfirmationSecret,
  //       { expiresIn: "30d" }
  //   );
  //
  //   let mailOptions = {
  //     template: 'welcome-onboard',
  //     message: {
  //       from: 'Alexis Mourlanne <alexis.mourlanne@gmail.com>',
  //       to: user.email,
  //     },
  //     locals: {
  //       userName: user.username,
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       token: token,
  //       password: sendPassword ? password : '*'.repeat(password.length)
  //     }
  //   };
  //
  //   await this.mailerService.sendMail(mailOptions);
  //
  //   delete user.password;
  //
  //   return user;
  // }
  //
  @Post("/account-confirmation")
  async verification(@Required() @QueryParams('token') token: string) {

    const user = await this.userService.getByAccountConfirmationToken(token);

    if (!user)
      throw new BadRequest('Not have account associate to this token.');

    if (user.activated)
      throw new BadRequest('User already activated');

    user.activated = true;
    await this.userService.save(user);


    return 'User succesfully activated.';
  }
  //
  // @Post("/password-reset")
  // async passwordReset(@QueryParam("email", { required: true }) email: string) {
  //
  //   const user: User|undefined = await this.userService.getOne({email});
  //
  //   if(!user)
  //     return;
  //
  //   const token = jwt.sign(
  //     { userId: user.id },
  //     security.jwtResetPasswordSecret,
  //     { expiresIn: "1h" }
  //   );
  //
  //   let mailOptions = {
  //     template: 'password-reset',
  //     message: {
  //       from: mailer.emailFrom,
  //       to: user.email,
  //     },
  //     locals: {
  //       userName: user.username,
  //       token: token
  //     }
  //   };
  //   const {response} = await this.mailerService.sendMail(mailOptions);
  //   return response;
  // }
  //
  // @Post("/password-reset/confirmation")
  // async passwordResetConfirmation(@QueryParam('token', { required: true }) token: string,
  //                                 @BodyParam('password', { required: true }) password: string,
  //                                 @BodyParam('confirmPassword', { required: true }) confirmPassword : string) {
  //
  //   if (password !== confirmPassword)
  //     throw new Error('Password are not the same.');
  //
  //   const user: User|undefined = await this.userService.getByToken(token, security.jwtResetPasswordSecret);
  //
  //   if(!user)
  //     throw new Error('Not have account associate to this token.');
  //
  //   user.password = password;
  //   user.hashPassword();
  //
  //   await this.userService.save(user);
  //
  //   return "Password succefully changed."
  // }

  @Get("/authenticate")
  public async authenticate(@Context('user') user: User) {
    return {
      authenticate: typeof user !== 'undefined',
      user: user
    };
  }
}
