import { User } from '../Entity/User';
import { UserService } from '../Services/UserService';
import { MailerService } from '../Services/MailerService';
import {
  BodyParams,
  Context,
  Controller,
  Get, PathParams,
  Post,
  QueryParams,
  RequestContext,
  Required,
} from '@tsed/common';

import { BadRequest } from 'ts-httpexceptions';

import { UserType } from '../Form/types/UserType';
import { AccountConfirmationToken } from '../Entity/AccountConfirmationToken';
import { CredentialsType } from '../Form/types/CredentialsType';
import { PasswordResetToken } from '../Entity/PasswordResetToken';

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

  @Post("/signup")
  async signUp(@BodyParams() userData: UserType) {

    const user = <User> userData;
    user.accountConfirmationToken = new AccountConfirmationToken();

    await this.userService.save(user);

    await this.mailerService.sendAccountConfirmation(user, user.accountConfirmationToken);

    return "Account created";
  }

  @Post("/account-confirmation/:token")
  async accountConfirmation(@Required() @PathParams('token') token: string,
                            @Required() @BodyParams() credentialsData: CredentialsType) {

    const user = await this.userService.getByAccountConfirmationToken(token);

    if (!user)
      throw new Error('Not have account associate to this token.');

    user.activated = true;
    user.accountConfirmationToken.used = true;

    user.password = credentialsData.password;
    user.hashPassword();

    await this.userService.save(user);

    return 'User succesfully activated.';
  }

  @Post("/account-confirmation/:token/validate-token")
  async accountConfirmationValidateToken(@Required() @PathParams('token') token: string) {

    const user = await this.userService.getByAccountConfirmationToken(token);

    return {
      valid: user !== undefined
    }
  }

  @Post("/password-reset")
  async passwordResetRequest(@Required() @QueryParams("email") email: string) {

    const user: User = await this.userService.getByEmail(email, ["passwordResetToken"]);

    if(!user)
      return;

    if(user.passwordResetToken) {
      user.passwordResetToken.refresh();
    } else {
      user.passwordResetToken = new PasswordResetToken();
    }

    await this.userService.save(user);

    await this.mailerService.sendPasswordReset(user, user.passwordResetToken);

    return "Password reset email send";
  }

  @Post("/password-reset/:token/validate-token")
  async passwordResetValidateToken(@Required() @PathParams('token') token: string) {

    const user = await this.userService.getByPasswordResetToken(token);

    return {
      valid: user !== undefined
    }
  }

  @Post("/password-reset/:token")
  async passwordReset(@Required() @PathParams('token') token: string,
                            @Required() @BodyParams() credentialsData: CredentialsType) {

    const user = await this.userService.getByPasswordResetToken(token);

    if (!user)
      throw new Error('Not have account associate to this token.');

    user.passwordResetToken.used = true;

    user.password = credentialsData.password;
    user.hashPassword();

    await this.userService.save(user);

    return 'Password succesfully reset.';
  }

  @Get("/authenticate")
  public async authenticate(@Context('user') user: User) {
    return {
      authenticate: typeof user !== 'undefined',
      user: user
    };
  }
}
